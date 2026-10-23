import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'

// Corre toda la suite de Jest, y a partir de su reporte --json genera un
// archivo plano con únicamente las pruebas que aprobaron (nombre completo,
// archivo y duración), para tener evidencia reusable de qué quedó cubierto.
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputPath = join(projectRoot, 'test-results-passed.json')
const tempDir = mkdtempSync(join(tmpdir(), 'jest-report-'))
const tempJsonPath = join(tempDir, 'jest-results.json')

let rawReport
let jestExitCode = 0

try {
  execFileSync(
    'npx',
    ['jest', '--json', `--outputFile=${tempJsonPath}`, '--silent'],
    { cwd: projectRoot, stdio: 'inherit' },
  )
} catch (error) {
  // jest sale con código != 0 si hay fallos; igual queremos leer el reporte
  // para listar lo que sí aprobó.
  jestExitCode = error.status ?? 1
}

try {
  rawReport = JSON.parse(readFileSync(tempJsonPath, 'utf8'))
} finally {
  rmSync(tempDir, { recursive: true, force: true })
}

const passedTests = []

for (const suite of rawReport.testResults) {
  const file = relative(projectRoot, suite.name)

  for (const test of suite.assertionResults) {
    if (test.status !== 'passed') continue

    passedTests.push({
      file,
      describe: test.ancestorTitles.join(' > '),
      title: test.title,
      fullName: test.fullName,
      durationMs: test.duration ?? null,
    })
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalSuites: rawReport.numTotalTestSuites,
    passedSuites: rawReport.numPassedTestSuites,
    totalTests: rawReport.numTotalTests,
    passedTests: rawReport.numPassedTests,
    failedTests: rawReport.numFailedTests,
    success: rawReport.success,
  },
  passed: passedTests,
}

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`)

console.log(`\nReporte escrito en ${relative(projectRoot, outputPath)}`)
console.log(`Pruebas que aprobaron: ${passedTests.length}/${rawReport.numTotalTests}`)

process.exit(jestExitCode)

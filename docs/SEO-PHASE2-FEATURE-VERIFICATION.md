# Phase 2 feature verification

Audited 2026-10-11. Application repositories were read only. Paths below are relative to the named product repository; no private code or documents are reproduced. Documentation was checked against wired UI and implementations, not treated as proof by itself.

| Product | Feature | Evidence | Implementation status / advertise? | Limits |
| --- | --- | --- | --- | --- |
| DataFix | CSV, XLSX, JSON, SQLite import and export | `src/DataFix.App/ViewModels/MainViewModel.cs` format sources, sinks and ExportFormatOptions; `src/DataFix.Formats/` | Implemented; yes | Tabular conversion changes structure; not a full workbook or database editor |
| DataFix | File analysis | `src/DataFix.Core/Services/DataFileWorkflowService.cs`, `Analysis/DataSetAnalyzer.cs` | Implemented and wired; yes | Detects data issues; no promise of physical file recovery |
| DataFix | Trim, duplicate removal, blank-row removal | `src/DataFix.Core/Transformations/`, `src/DataFix.App/MainWindow.xaml`, MainViewModel transformation construction | Implemented and wired; yes | Duplicate removal compares whole rows, retains first occurrence; no selected-key UI |
| DataFix | Preview Changes and export to new file | MainWindow.xaml; MainViewModel preview and export; format sinks and ExportDestinationGuard | Implemented; yes | Preview is review-only; export applies selected fixes. Review warnings and exported output |
| DataFix | Worksheet/table selection | MainViewModel; `src/DataFix.Formats/Xlsx/XlsxWorksheetResolver.cs`, SqliteTableResolver.cs | Implemented; yes | Exports the selected dataset, not an entire original workbook/database |
| DataFix | XLSX formula/format fidelity | XlsxDataProvider.cs, XlsxDataSink.cs | Limited; advertise data workflows only | Reads cached formula values, writes data values; not preservation of formulas, styles or workbook structure |
| Magic | CSV and XLSX data import/export | `ACTUAL-FEATURES.md`; `src/DataFixMagic.Infrastructure/Csv/` and `Excel/`; App MainWindow.xaml | Implemented; yes | First worksheet only; saved formula values; one-sheet XLSX export. JSON is recipes, not data import |
| Magic | Text, row and column operations | `src/DataFixMagic.Application/Operations/`, App MainWindow.xaml and OperationsPanelViewModel.cs | Implemented and wired; yes | Read-only grid; changes through operations. Upper/lower case, not title case |
| Magic | Configurable validation | Application Validation rules and App ValidationPanelViewModel.cs | Implemented; yes | Format/rule checks, not proof of real-world validity or automatic correction |
| Magic | Exact and fuzzy duplicate review | Application Dedupe/Exact/ExactDuplicateMatcher.cs, Fuzzy/ and Removal/; App DedupePanelViewModel.cs | Implemented; yes | Exact: case-sensitive, untrimmed whole row or selected keys. Fuzzy: similarity suggestions need human review |
| Magic | Recipes and batches | Application Recipes/RecipeFromHistoryBuilder.cs, OperationAdapters/; Batch/BatchProcessor.cs and BatchFileDiscovery.cs | Implemented; yes | Recipes exclude duplicate removal and selected-row removal; top-level folder only; matching headers required |
| Magic | Undo/redo, export source protection | Application History/; Infrastructure CSV/XLSX exporters; App MainWindow.xaml | Implemented; yes | Undo applies in-session; keep original backups |
| Magic | CSV delimiter and encoding handling | Infrastructure Csv/CsvImporter.cs ResolveDelimiter / ResolveEncoding | Implemented; qualified yes | Comma/semicolon detection; BOM-aware reading, UTF-8 fallback; no UI encoding picker or general malformed-file recovery |
| Both | Authentic public images | Existing website README asset provenance and approved public/images assets | Reuse; yes | DataFix captures predate a header whitespace fix; label as sample captures |
| Both | Released-version equivalence | Local release documentation is not sufficient evidence of current Store package | Owner confirmation needed | Supplied official Store destinations retained. No version, release status, Windows minimum or price claim added |
| Both | AI, corruption recovery, guaranteed results, speed comparisons, ratings, offers | No sufficient verified evidence | Excluded | No invented claims or structured-data properties |

## Owner confirmation

Confirm that the current Store packages match these implemented workflows. DataFix's older README still describes submission as pending; Magic's actual-feature audit describes package 1.0.20.0. Neither establishes today's deployed package contents. New copy sticks to implemented capabilities and directs visitors to the Store for compatibility, pricing and availability. Refresh the approved DataFix captures when available.

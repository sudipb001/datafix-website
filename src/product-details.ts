export const productDetails = {
  datafix: {
    intro: 'Open a supported data file, understand the issues, and export a cleaned dataset. DataFix brings inspection, selected cleanup operations, and format conversion into one Windows workspace.',
    features: [
      { title: 'Understand the file before changing it', text: 'Analysis highlights duplicate rows, blank values, and whitespace issues. Review these findings to decide which changes fit your data.' },
      { title: 'Choose the cleanup you need', text: 'Trim whitespace, remove whole-row duplicates, or remove blank rows. Keep meaningful differences: two records sharing an ID are not necessarily duplicate rows.' },
      { title: 'Review a before-and-after preview', text: 'Preview Changes shows examples of selected transformations before export. Opening the preview does not apply or save changes; review its warnings as well as the examples.' },
      { title: 'Export a dataset in a supported format', text: 'Choose CSV, XLSX, JSON, or SQLite as the output format. Export writes a new file; converting a dataset is not the same as preserving an entire workbook or database.' },
    ],
    formats: [
      ['CSV', 'Open, analyze, transform and export tabular rows.'],
      ['XLSX', 'Choose a worksheet, inspect its values, apply supported fixes and export data.'],
      ['JSON', 'Open supported JSON data; flatten nested data where available, or choose native JSON output options.'],
      ['SQLite', 'Select a table or run a read-only query; inspect and export the resulting dataset.'],
    ],
    steps: ['Select Open File and choose a supported file. For XLSX or SQLite, choose the worksheet or table you intend to work on.', 'Review the analysis and browse the data. Decide what should change and what must be preserved.', 'Select available fixes such as Trim whitespace, Remove duplicate rows, or Remove blank rows.', 'Select Preview Changes and review examples and warnings. This preview is a review step, not a save action.', 'Choose the export format and its Export Cleaned button. Use a new filename, then reopen the result and check counts and important values.'],
    faqs: [
      ['Does it remove duplicates based on a customer ID?', 'DataFix’s Remove duplicate rows option compares the whole row and retains the first occurrence. For selected-column keys and grouped review, explore DataFix Magic.'],
      ['Will it preserve my Excel workbook?', 'The workflow exports data values from a selected worksheet. It is not a full workbook editor: formulas, formatting, charts, and the original multi-sheet structure should not be assumed to survive an export. Keep the original.'],
      ['Does Preview Changes modify the source?', 'No. Preview Changes is review-only. Export applies the selected operations to the output and protects the source path from being overwritten.'],
      ['Can it recover a corrupted file?', 'These pages describe cleaning readable data. They make no claim that DataFix can recover physically damaged workbooks, databases, or arbitrary malformed files.'],
    ],
  },
  'datafix-magic': {
    intro: 'For recurring CSV and Excel data tasks, combine cleaning operations with configurable checks and deliberate duplicate review. Save compatible operations as a recipe when the next file needs the same steps.',
    features: [
      { title: 'Clean text, rows, and columns', text: 'Trim Whitespace, Case Transform, and Find & Replace address inconsistent text. Remove Blank Rows, rename headers, and split or merge columns to shape a dataset. The grid is read-only; changes run through operations.' },
      { title: 'Check your own data rules', text: 'Configure required, numeric, email, phone, date, range, and duplicate-key checks. Review flagged rows alongside your data. These checks identify rule violations; they do not prove that a contact or value is correct.' },
      { title: 'Review exact and similar duplicates', text: 'Compare whole rows or selected key columns for exact matches. Fuzzy matching suggests similar records for review; inspect them before selecting rows to remove. Undo and redo support in-session changes.' },
      { title: 'Reuse compatible cleaning steps', text: 'Create a recipe from compatible history operations and apply it to files with matching column names. Batch processing runs a recipe on CSV/XLSX files in the top level of a folder. Duplicate removal and Remove Selected Rows are not recipe steps.' },
    ],
    formats: [
      ['CSV', 'Import text values with comma/semicolon detection and BOM-aware reading; export comma-separated UTF-8 with a BOM. No encoding picker is exposed.'],
      ['XLSX', 'Import the first worksheet and saved formula values. Export a new one-sheet workbook containing data values, not formulas.'],
      ['Recipe JSON', 'Import/export cleaning instructions. This is not general JSON data-file support.'],
    ],
    steps: ['Use Open or File → Open to load a CSV or XLSX. Read import notes, especially when a workbook has several worksheets.', 'Inspect the grid. Choose an operation from Operations, configure its columns and options, then review the changed values.', 'Configure and run Validation checks. Use the results to inspect flagged rows; rerun validation after further changes.', 'Use Duplicates when needed. Review groups and select only the rows you intend to remove; use Undo if a change was wrong.', 'Select Export CSV or Export XLSX and save a new file. Reopen it to verify the result. For recurring cleanup, create a compatible recipe and check it against the next file before applying it.'],
    faqs: [
      ['Can I import every sheet in a workbook?', 'Magic imports the first worksheet only and reports the choice in import notes. It exports one sheet named Sheet1. Use a separate working copy containing the intended sheet if necessary.'],
      ['Are fuzzy matches automatically removed?', 'No. Fuzzy comparison finds similar rows for review. Select the rows to remove and confirm the operation. Similar names or addresses can belong to different records.'],
      ['Can a recipe remove duplicates in a batch?', 'No. Recipes support compatible text, row, and column operations, but exclude duplicate removal and Remove Selected Rows. Folder batches apply the recipe only; they do not automate those excluded steps.'],
      ['Is Magic an AI tool?', 'The verified workflow uses configured operations, validation rules, and similarity matching. No AI-powered functionality is advertised.'],
      ['Can I edit a cell directly?', 'The grid is read-only. Use the available operations to transform data, or correct source values in a suitable editor and import the revised copy.'],
    ],
  },
}

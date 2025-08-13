# LibGS
Wrapper, utility and testing framework for Google sheets.

# FrameGS
Lightweight framework for google sheets scripts. It contains:
	- Wrapper classes for the Application, Spreadsheets, sheets, ranges and range lists to allow OOP.
	- Dependency management system, to minimize API calls and allow singletons. ( also to allow Mocking in the unit tests )
	- Event service system for handling events and "fake" buttons.
	- And many useful functions that can make work with the sheets easier. 

# TestGS
Test framework for google sheets. It features:
	- A test framework for running tests and printing the results. 
	- Sheet based test support to test yout sheet functions, formats, data, validations, and many more.
	- Unit test framework with Mocking to test your scripts.
	- Acceptance test framework to write and run end to end tests including your sheet and scripts. 
	- Print results on console and option to print them on a "test" sheet. 
	- Ability to continue timed out tests ( solution for the 6 min runtime limit for google ) 
	

# Project
## Folder sructure
	Recomended project stucture:
	
	Root folder
		node_modules 				// Folder for npm google-apps-script
		project
			_Libs					// Folder for the LibGS
			Project					// Folder for your project			
			appscript.json
		.clasp
		
## Clasp json
```
	{
	  "scriptId": YOUR_SCRIPT_ID,
	  "rootDir": "project",
	  "scriptExtensions": [
		".js",
		".gs"
	  ],
	  "htmlExtensions": [
		".html"
	  ],
	  "jsonExtensions": [
		".json"
	  ],
	  "filePushOrder": [],
	  "skipSubdirectories": false
	}
```

# Help / Tutorial
Currently there are no tutorials available, but I am working on making one. In the meantime I suggest you check out my other project "CalCalSheet" to see how the frameworks are used in a real project. 


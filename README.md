Security Audit Tool
===================


Simple Audit Tool is a security audit tool which, as its name mentions, aims to be as simple as possible.
This tool has been designed and conceived to assist the security auditor in his different missions, by proposing a configurable list of questions related to several security domains and by creating an understandable chart at the end of the audit. 
For each question, the auditor can choose a grade going from 1 to 5, a "I don't know" option if he can't answer that question or a "not concerned" option if this question doesn't apply to the situation.


## Installation

This tool requires MySQL and Node.js to work. All the other dependencies are included in the repository. 

### Importing the initial questions to your database

A set of audit questions are included in the repository and needs to be imported in your MySQL database.

### Launching the tool

With a terminal, go to the root folder Audit-Tool and write "node server.js".
You can then access the tool with a browser by going to "localhost:8080"

## How to use Simple Audit Tool

Once that you have finished the installation, the hardest part is done!
Launch the tool and go to "localhost:8080" with your web browser. 
Simple Audit Tool is made of 3 main parts: New Audit, Load Audit and Manage Questions.

### New Audit

This is the default page you will land on when opening the tool. The basic audit from your database will be automatically loaded and you can start answering the questions right away. For each question, you can choose a grade going from 1 to 5 or 2 other options: "I don't know" which will consider 2 extreme values when creating the chart, and "Not concerned", which will allow creating the chart without considering this question. It's important to consider that any non-answered question will be considered as "Not concerned".
You can use the "Save" button to download a JSON file containing your audit with your answers (which can be imported in the Load Audit part).
After answering to the questions of the last domain of the audit, you will be able to click on the "View Chart" button, which will generate a star chart based on your answers. This chart is meant to observe easily what part of the security has to be improved. Above this chart, you will find a button to download a PDF file containing the chart, as well as a field to write the name of the organization you're auditing.

### Load Audit

This part is relatively close to the previous one. The only difference is that instead of loading the questions from the database, the tool will be waiting for you to select a JSON file containing an audit that you saved.

### Manage Questions

This part of the tool is used to modify the audit on your database. Here, you can create, delete or modify questions as well as domains. You can customize your audit to make it meet your expectations.

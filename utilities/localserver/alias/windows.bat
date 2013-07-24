:: Running the Command Console at the current directory

:: gets to the current directy (variable, which holds the path at which the batch file is located)
::cd /d %~dp0

@echo off

echo %~dp0

:: starts a new command console
cmd.exe

exit

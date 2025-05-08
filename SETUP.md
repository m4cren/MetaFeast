#SETTING UP OUR SYSTEM
**BACKEND CONFIGURATION AND ACTIVATION**

1. cd to the server and make your own virtual environment, python -m venv "venv_name"
2. activate the virtual environment, for windows: venv_yourname/scripts/activate, for linux: source venv_yourname/bin/activate
3. install the requirements in the server directory, pip install -r requirements.txt
4. configure the database in **init**.py but it set to sqlite in default, but you can change it in line 56
5. configure the ip address you want to use in main.py in line 29
6. run the main.py

   **FRONTEND CONFIGURATION AND ACTIVATION**

7. go back to the root directory, /Metafeast
8. cd to client
9. match the ip address that you set in the /client/useServerAddress.tsx in line 2
10. enter 'npm install' to install the package that is required for this system
11. enter npm run dev

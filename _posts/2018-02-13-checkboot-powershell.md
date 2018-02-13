---
layout: post
title: Checkboot Powershell
date: 2018-02-13 20:14
author: Thomas ASNAR
categories: [ps1, reboot, checkboot, powershell]
---

```powershell
write-host "Pour infomation, veuillez trouver ci-après les derniers reboots"
get-eventlog system | where-object {$_.eventid -eq 6005} | select-object TimeWritten,Message -first 10

$CR=0
try{
    $lastebootuptimeDate = Get-WmiObject win32_operatingsystem | ForEach-Object{$_.ConverttoDateTime($_.lastbootuptime)}
}catch{
    throw "Erreur commande"
    exit 123
}

# on compare la date du dernier boot avec now - 30 minutes
if(($lastebootuptimeDate) -gt ((get-date).addMinutes(-30))){
    write-host "Le dernier démarrage date de moins de 30 minutes"
}else{
    write-host "Le dernier démarrage date de plus de 30 minutes"
    $CR=10
}
write-host "Le dernier démarrage date du : "$lastebootuptimeDate.ToString('dd-MM-yyy HH:mm')
write-host "Exit -> [$CR]"
exit $CR
```

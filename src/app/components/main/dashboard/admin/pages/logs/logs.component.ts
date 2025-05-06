import { Component, inject, OnInit } from '@angular/core';
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { LogsService } from '../../../../../../services/logs/logs.service';
import { Logs } from '../../../../../../model/log';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ NgFor, ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
}) 

export class LogsComponent implements OnInit {

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  logService = inject(LogsService)
  logs : Logs[] = []

  ngOnInit(): void {
    this.getAllLogs();
  }

  getAllLogs(){
    this.logService.getAllLogs().subscribe({
      next: (response) => {
        this.logs = response
      }
    })
  }
}

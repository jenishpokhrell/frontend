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

  logService = inject(LogsService)
  logs : Logs[] = []
  sortedLogs: Logs[] = []

  ngOnInit(): void {
    this.getAllLogs();
  }

  getAllLogs(){
    this.logService.getAllLogs().subscribe({
      next: (response) => {
        this.logs = response
        this.sortedLogs = this.logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
    })
  }
}

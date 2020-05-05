"use strict"

let all_projects = document.querySelectorAll('.block a');


let statuses = new Map();

for(let project of all_projects) {
    let status = project.className;
    if(statuses.has(status)) {
        statuses.set(status, statuses.get(status) + 1);
    } else {
        statuses.set(status, 1);
    }
}

let statuses_percents = new Map();

for(let [status, count] of statuses) {
    let percent = Math.round(count / all_projects.length * 100);
    statuses_percents.set(status, percent);
}

let timelines = document.querySelectorAll('.timeline *');

for (let [status, percent] of statuses_percents) {
    let className = status + '_line';
    console.log(className)
    let line = document.querySelector('.' + className);
    line.style.width = percent + '%';
}
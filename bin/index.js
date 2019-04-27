const { execSync } = require('child_process');
const blessed = require('blessed');
const projectsList = require('../sample.config1');
const screen = blessed.screen({
    smartCSR: true,
    fullUnicode: true
});

screen.title = "FE ATOM";


const listTable = blessed.listtable({
    label: "Project Manage",
    parent: screen,
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    border: {
        type: 'line',
        left: true,
        top: true,
        right: false,
        bottom: false
    },
    // border: 'line',
    align: 'center',
    tags: true,
    keys: true,
    vi: true,
    mouse: true,
    style: {
        header: {
            fg: 'blue',
            bold: true
        },
        cell: {
            fg: 'magenta',
            selected: {
                bg: 'blue'
            }
        }
    },
    data: projectsList.projects
});

listTable.on('select', function (el, selected) {
    if (listTable._.rendering) return;
    console.log(selected);
    // execSync(`code ${projectsList.projects[selected][2]}`)
});




screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});


screen.append(listTable);
listTable.focus();
// listTable.select(0);
screen.render();
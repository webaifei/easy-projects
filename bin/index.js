const { execSync } = require('child_process');
const blessed = require('blessed');
const projectsList = require('../sample.config1');
const screen = blessed.screen({
    smartCSR: true,
    fullUnicode: true
});

screen.title = "my window title";

const list = blessed.list({
    // parent: screen,
    label: "Project Manage",
    tags: true,
    top: 0,
    right: 0,
    width: "100%",
    height: '50%',
    keys: true,
    vi: true,
    mouse: true,
    border: 'line',
    scrollbar: {
        ch: ' ',
        track: {
            bg: 'cyan'
        },
        style: {
            inverse: true
        }
    },
    style: {
        item: {
            hover: {
                bg: 'blue'
            }
        },
        selected: {
            bg: 'blue',
            bold: true
        }
    },
});
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
list.setItems(projectsList.projects.map(item=>Object.values(item).join('')));
list.on('select', function (el, selected) {
    if (list._.rendering) return;
    console.log(el);
});
// list.focus();
// list.enterSelected(0);

listTable.on('select', function (el, selected) {
    if (listTable._.rendering) return;
    execSync(`code ${projectsList.projects[selected][2]}`)
});
listTable.enterSelected(0);
listTable.focus();
// If our box is clicked, change the content.
// box.on('click', function(data) {
//   box.setContent(`{center}Some different {red-fg}content: ${data.x}, ${data.y}{/red-fg}.{/center}`);
//   screen.render();
// });
//
// box.key('enter', function(ch, key) {
//   box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
//   box.setLine(1, 'bar');
//   box.insertLine(1, 'foo');
//   screen.render();
// });


screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});


// screen.append(list);
screen.append(listTable);

screen.render();
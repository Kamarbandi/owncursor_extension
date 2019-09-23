class Defpop {
    constructor() {
        this.collection = {};
        this.myOwnListCol = {};
        this.colOfSite = {};
        this.size = 3;

        chrome.storage.local.get(null, function (items) {
            this.myOwnListCol = items.myOwnListCol;
            this.colOfSite = items.collection;
            this.size = items.size;
            for (let index in this.colOfSite) {
                let collection = this.colOfSite[index];
                this.collection[collection.slug] = collection;
            }

            chrome.storage.local.get('selected', function (data) {
                this.selected = items.selected;
            }.bind(this));

            this.init();
            this.makelocalize();
        }.bind(this));
        (new LanguageLocal()).init();
    }

    change_i18n(o, t) {
        let messages = t.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if (messages != t) {
            o.innerHTML = messages;
        }
    }

    makelocalize() {
        let resultat = document.querySelectorAll('[data-aju23]');
        for (let z in resultat)
            if (resultat.hasOwnProperty(z)) {
                let obj = resultat[z],
                    tag = obj.getAttribute('data-aju23').toString();
                this.change_i18n(obj, tag);
            }
        let sehife = document.getElementsByTagName('html');
        for (let j = 0; j < sehife.length; j++) {
            let obj = sehife[j],
                tag = obj.innerHTML.toString();
            this.change_i18n(obj, tag);
        }
    }

    init() {
        $("#allCategoryOwn").html("");
        let categoryNode = $("#allCategoryOwn");

        let cat = $(`<div class="icons-category normal skin-1" data-index="-1"><h1 name="myOwnListCol"><a name="myOwnListCol">My List</a></h1></div>`);
        for (let image in this.myOwnListCol) {
            let elem = null, item = this.myOwnListCol[image];
            if (item.cursor.path) {
                elem = $(`<div class="icon">
                <img class="icon-img  cursor" data-id="${image}"  data-index="${image}"  data-cat="-1" data-category="-1" src="${item.cursor.path}"></div>`);
            } else {
                elem = $(`<div class="icon" >
                <img class="icon-img  cursor" data-id="${image}"  data-index="${image}" data-cat="-1" data-category="-1" src="${item.pointer.path}"></div>`);
            }
            cat.append(elem);
        }
        categoryNode.append(cat);
        for (let index in this.collection) {
            if (!this.collection[index]) {
                return;
            }
            let item = this.collection[index],
                cat = $(`<div class="icons-category nature normal skin-1" data-index="${index}">
                            <h1 name="${item.slug}">${item.name}</h1>
                        </div>`);
            let curIndex = index;

            try {
                item.items.forEach(function (image, i) {
                    let elem = $(`<div class="icon">
                        <img class="icon-img button lazyload cursor"
                            data-id="${i}" data-index="${i}" title="${image.name}" data-cat="${curIndex}" data-category="${item.id}"  data-src="${image.cursor.path}"
                            src="/icons/loading.gif">                
                        </div>`);
                    cat.append(elem);
                }.bind(this));
            } catch (e) {
            }
            categoryNode.append(cat);
        }


        $(".b-menu-icon__item.m-menu-icon-item-middle, .b-menu-icon").on("click", function () {
            chrome.runtime.openOptionsPage();
        });

        $(".btn-settings").on('click', function () {
            chrome.runtime.openOptionsPage();
        });

        $("#defaultCursor").on("click", function () {
            chrome.storage.local.set({"selected": null, selected_type: 'none'});
            this.reload()
            this.clear();
        }.bind(this));

        $("img.cursor").on('click', function (e) {

            let dataId = $(e.target).data('cat'),
                id = $(e.target).data('index'), item;

            console.log('dataId:'+dataId+' id:'+id);
            console.log(this.myOwnListCol);
            console.log(this.collection);


            if (dataId == -1) {
                item = this.myOwnListCol[id];
                item.type = item.type;
            } else {
                item = this.collection[dataId].items[id]
                item.type = 'system';
            }
            if (typeof (item.type) == 'undefined') {
                item.type = 'custom';
            }


            var size = this.size;


            let settings = {
                width: 24,
                height: 24
            };

            if (size == 1) {
                settings.width = 16;
                settings.height = 16;
            }
            if (size == 2) {
                settings.width = 24;
                settings.height = 24;
            }
            if (size == 3) {
                settings.width = 32;
                settings.height = 32;
            }
            if (size == 4) {
                settings.width = 48;
                settings.height = 48;
            }
            if (size == 5) {
                settings.width = 64;
                settings.height = 64;
            }
            if (size == 6) {
                settings.width = 80;
                settings.height = 80;
            }
            if (size == 7) {
                settings.width = 96;
                settings.height = 96;
            }
            if (size == 8) {
                settings.width = 128;
                settings.height = 128;
            }


            if(item.pointer.path) {
                if (!item.pointer.original) {
                    item.pointer.original = item.pointer.path.replace('http://owncursor.com', "");
                    item.pointer.original = item.pointer.path.replace('chrome-extension://ogdlpmhglpejoiomcodnpjnfgcpmgale', "");
                }
            }


            if(item.cursor.path){
                if (!item.cursor.original) {
                    item.cursor.original = item.cursor.path.replace('http://owncursor.com', "");
                    item.cursor.original = item.cursor.path.replace('chrome-extension://ogdlpmhglpejoiomcodnpjnfgcpmgale', "");
                }
            }

            item.render_size = size;

            if (item.type == 'custom') {
                chrome.storage.local.set({selected: item, selected_type: 'local'});
            }

            let cursor, pointer;

            if(item.pointer.path) {
                if (!item.pointer.original) {
                    item.pointer.original = item.pointer.path;
                }
                pointer = this.resizeImgData(item.pointer.original, settings.width, settings.height, 'pointer')
            }

            if(item.cursor.path) {
                if (!item.cursor.original) {
                    item.cursor.original = item.cursor.path;
                }
                cursor = this.resizeImgData(item.cursor.original, settings.width, settings.height, 'cursor')
            }

            Promise.all([ cursor, pointer]).then( (values) => {
                for(let i in values){
                    if (values[i].type == 'pointer') {
                        item.pointer.path = values[i].data
                    }
                    if (values[i].type == 'cursor') {
                        item.cursor.path = values[i].data
                    }
                }
                chrome.storage.local.set({selected: item, selected_type: 'system'});
            });

            this.reload()
        }.bind(this));
        $(".lazyload").lazyload();
    }

    clear() {
        let message = {action: 'clear'};
        chrome.storage.local.set({selected: null, selected_type: 'none'});

        chrome.runtime.sendMessage(message);
    }

    reload() {
        chrome.tabs.query({}, function (tabs) {
            let message = {action: 'update'};
            for (let i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });
    }

    resizeImgData(datas, wantedWidth, wantedHeight, type) {
        return new Promise(function (resolve, reject) {
            let img = document.createElement('img');
            img.onload = function () {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
                ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
                let dataURI = canvas.toDataURL('image/png', 1);
                resolve({
                    type: type,
                    data: dataURI
                });
            };
            img.src = datas;
        })
    }
}

(function () {
    new Defpop();
})()
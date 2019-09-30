const Browser = chrome;

class background {
    constructor() {
        this.initListeners();
        this.collection = {};
        this.id = null;
        this.config_sync = {};

        chrome.storage.sync.get(null, function (items) {
            this.config_sync = items;
        }.bind(this));
        chrome.storage.sync.get('uid', function (items) {
            this.uid = items.uid;
        }.bind(this));
        chrome.storage.local.get(null, function (items) {
            if (!items.collection) {
            } else {
                try {
                    this.collection = items.collection;
                } catch (e) {
                }
            }
        }.bind(this));


        chrome.storage.onChanged.addListener(function (changes, area) {
            if (changes.size || changes.selected) {
                chrome.storage.local.get(['selected', 'size', 'rendered'], function (selected) {
                    let item = selected.selected;
                    var size = selected.size;
                    // console.log(item);
                    if(item.render_size == size){
                        console.log('Is Rendered!')
                        return;
                    }
                    item.render_size = size;

                    let settings = {
                        max_width: 24,
                        max_height: 24
                    };

                    if (size == 1) {
                        settings.max_width = 16;
                        settings.max_height = 16;
                    }
                    if (size == 2) {
                        settings.max_width = 24;
                        settings.max_height = 24;
                    }
                    if (size == 3) {
                        settings.max_width = 32;
                        settings.max_height = 32;
                    }
                    if (size == 4) {
                        settings.max_width = 48;
                        settings.max_height = 48;
                    }
                    if (size == 5) {
                        settings.max_width = 64;
                        settings.max_height = 64;
                    }
                    if (size == 6) {
                        settings.max_width = 80;
                        settings.max_height = 80;
                    }
                    if (size == 7) {
                        settings.max_width = 96;
                        settings.max_height = 96;
                    }
                    if (size == 8) {
                        settings.max_width = 128;
                        settings.max_height = 128;
                    }

                    let cursor, pointer;
                    if (item.pointer.path) {
                        if (!item.pointer.original) {
                            item.pointer.original = item.pointer.path;
                        }
                        pointer = this.resizeImgData(item.pointer.original, settings.max_width, settings.max_height, 'pointer');
                    }

                    if (item.cursor.path) {
                        if (!item.cursor.original) {
                            item.cursor.original = item.cursor.path;
                        }
                        cursor = this.resizeImgData(item.cursor.original, settings.max_width, settings.max_height, 'cursor');
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
                    })

                }.bind(this))
            }

            chrome.storage.sync.get('uid', function (items) {
                this.uid = items.uid;
            }.bind(this));

            chrome.storage.sync.get(null, function (items) {
                this.config_sync = items;
            }.bind(this));

            chrome.storage.local.get('collection', function (items) {
                if (!items.collection) {
                } else {
                    try {
                        this.collection = items.collection;
                    } catch (e) {
                    }
                }
            }.bind(this));
        }.bind(this));
        setTimeout(this.authSync.bind(this), 1000 * 1);//1000*60
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

    migrate(details) {
    }

    onInstall() {
        chrome.tabs.query({}, function (tabs) {
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].url.indexOf('http') != -1) {
                        try {
                            chrome.tabs.executeScript(tabs[i].id, {file: "js/owncursor.js"}, function (result) {
                                let lastErr = chrome.runtime.lastError;
                                if (lastErr) console.log('tab: %s', tabs[i].url);
                            });
                        } catch (e) {
                            console.log('error execute code')
                        }
                    }
                }
            }
        );
        chrome.tabs.create({url: `http://owncursor.com/successful`});
        chrome.storage.sync.set({
            di: (new Date()).getTime(),
            uid: this.getUserUid(),
        });
        chrome.storage.local.set({
            domain: 'http://owncursor.com/',
            collection: listOfCollection,
            size: 3,
            myOwnListCol: {}
        });
    }

    getSync() {
        chrome.storage.sync.get(null, function (data) {
            console.log(data);
            console.group("getSync");
            if (data.selected) {
                //chrome.storage.local.set({selected: data.selected})
            }
            if (data.size) {
                chrome.storage.local.set({size: data.size})
            }
            if (data.packs) {
                $.ajax({
                    url: 'http://owncursor.com/api/packs',
                    data: {
                        packs: data.packs
                    },
                    method: 'post'
                }).done(function (response) {
                    for (let i in response) {
                        let data = response[i];
                        this.collection = listOfCollection;
                        this.collection[data.slug] = data;
                    }
                    chrome.storage.local.set({collection: this.collection});
                }.bind(this))
            }
            console.groupEnd();
        }.bind(this));
    }

    initListeners() {
        chrome.runtime.onInstalled.addListener(function (details) {
            if (details.reason == "install") {
                this.onInstall()
                console.log('sync');
                // this.getSync()
            } else if (details.reason == "update") {
                this.migrate(details)
                chrome.storage.sync.set({du: (new Date()).getTime()});
            }
        }.bind(this));

        chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
            if (request.action == "getInstalled") {
                return sendResponse({
                    collections: this.collection,
                    ver: chrome.runtime.getManifest().version,
                    uid: this.uid,
                    action: 'get_installed_collection'
                });
            }
            if (request.action == "install_collection") {
                let data = {},
                    res = {
                        status: true,
                        version: chrome.runtime.getManifest().version,
                        uid: this.uid,
                        action: 'install_collection'
                    }

                sendResponse(res);
                data = request;


                chrome.storage.local.get(null, function (items) {
                    this.collection = items.collection;
                    // this.collection[data.slug] = data.collection;
                    let slug = data['slug'];
                    delete data['slug'];
                    delete data.collection['slug'];

                    this.collection[slug] = data.collection[slug];

                    console.log(this.collection);

                    chrome.storage.local.set({collection: this.collection});
                    return sendResponse(res);
                }.bind(this));
            }

            if (request.action == "install_pack") {
                let data = {},
                    res = {
                        status: true,
                        version: chrome.runtime.getManifest().version,
                        uid: this.uid,
                        action: 'install_collection'
                    }

                sendResponse(res);
                data = request;


                chrome.storage.local.get(null, function (items) {
                    this.collection = items.collection;
                    let slug = data['slug'];
                    delete data['slug'];
                    delete data.collection['slug'];

                    this.collection[slug]['items'].push(data.collection[slug]['items'][0]);

                    console.log(this.collection);

                    chrome.storage.local.set({collection: this.collection});
                    return sendResponse(res);
                }.bind(this));
            }

            if (request.action == 'get_config') {
                chrome.storage.local.get(null, function (items) {
                    return sendResponse(items);
                }.bind(this));
            }
            if (request.action == 'set_config') {
                chrome.storage.local.set(request.data);
                return sendResponse({status: true});
            }

            if (request.action == 'set_config_sync') {
                chrome.storage.sync.set(request.data);
                return sendResponse({status: true});
            }

            if (request.action == 'get_config_sync') {
                return sendResponse(this.config_sync);
            }

        }.bind(this));
    }

    getUserUid() {
        let buf = new Uint32Array(4),
            idx = -1;
        window.crypto.getRandomValues(buf);
        let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            idx++;
            let r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }.bind(this));
        return uid;
    }

    authSync() {
        // kolleksiayalarda deyishiklik olanda
        chrome.storage.local.set({
            collection: listOfCollection
        });
        // end

        chrome.storage.local.get(['collection', 'selected', 'size'], function (data) {
            var packMap = new Map();
            var packs = [];
            chrome.storage.sync.set({'size': data.size});
            /*  if (data.selected.type == 'system') {
                  chrome.storage.sync.set({'selected': data.selected});
              }*/
            for (let i in data.collection) {
                let collection = data.collection[i];
                for (let y in collection.items) {
                    packs.push(collection.items[y].id);
                    packMap.set(collection.items[y].id, true)
                }
            }
            chrome.storage.sync.get('packs', function (items) {
                chrome.storage.sync.set({'packs': packs});
            });
        });
        setTimeout(this.authSync.bind(this), 1000 * 120);
    }


}

(function () {
    new background();
})();
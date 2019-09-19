var ticks_labels = [];
var maxSize = 128;
var parser = new UAParser();
var result = parser.getResult();

if (result.os.name == "Linux" || result.os.name == 'Chromium OS' || result.os.name == 'macOS') {
    maxSize = 128;
}


if (result.os.name == "Windows") {
    switch (result.os.version) {
        case "10":
            maxSize = 128;
            break;
        case "8.1":
            maxSize = 64;
            break;
        case "8":
            maxSize = 64;
            break;
        case "7":
            maxSize = 64;
            break;
        default:
            maxSize = 64;
            break;
    }
}
if (maxSize == 128) {
    ticks_labels = [
        chrome.i18n.getMessage("cursor_size_small"),
        chrome.i18n.getMessage("cursor_size_24x24"),
        chrome.i18n.getMessage("cursor_size_32x32"),
        chrome.i18n.getMessage("cursor_size_48x48"),
        chrome.i18n.getMessage("cursor_size_64x64"),
        chrome.i18n.getMessage("cursor_size_80x80"),
        chrome.i18n.getMessage("cursor_size_96x96"),
        chrome.i18n.getMessage("cursor_size_large"),
    ];
    $("#inputSlider").append(`
      <input id="ex21" type="text" name="size_cursor" style="display: none"
            data-slider-tooltip="hide"
            data-slider-ticks="[1, 2, 3, 4, 5, 6, 7, 8]"
            data-slider-ticks-labels='["small", ".", ".", ".", ".",  ".", ".", "large"]'
            data-slider-min="1"
            data-slider-max="8"
            data-slider-step="1"
            data-slider-value="8"
            value="2"/>   
    `)
}
if (maxSize == 64) {
    ticks_labels = [
        chrome.i18n.getMessage("cursor_size_small"),
        chrome.i18n.getMessage("cursor_size_24x24"),
        chrome.i18n.getMessage("cursor_size_32x32"),
        chrome.i18n.getMessage("cursor_size_48x48"),
        chrome.i18n.getMessage("cursor_size_large"),
    ];
    $("#inputSlider").append(`
      <input id="ex21" type="text" name="size_cursor" style="display: none"
            data-slider-tooltip="hide"
            data-slider-ticks="[1, 2, 3, 4, 5]"
            data-slider-ticks-labels='["small",  ".", ".", ".", "large"]'
            data-slider-min="1"
            data-slider-max="5"
            data-slider-step="1"
            data-slider-value="5"
            value="2"/>   
    `)
}


chrome.storage.local.get('size', function (data) {
    let sv = data.size;

    $("#ex21").slider({
        value: sv, focus: true,
        ticks_labels: ticks_labels,
    }).on("change", function (item) {
        let size = item.value.newValue;
        chrome.storage.local.set({size: size});
        console.log(size);
    });
})

chrome.storage.local.get(null, function (items) {
    var collections = items.collection;
    var wrapFiles = $('.files-wr'), newFileInput;
    if (collections) {
        for (let i in collections) {
            var collection = `
                <div class="col-4 collection-card" data-id="${i}">
                    <div class="card card-collection">
                        <h5 class="card-title">${collections[i].name}</h5>
                        <a href="#" data-toggle="modal" data-target="#${collections[i].slug}" class="show">
                            <img  src="${collections[i].image}" class="card-img-top img-fluid" alt="img">
                        </a>          
                        <div class="card-body row">      
                        <div class="col text-left">
                            <a class="btn btn-danger card-link delete" href="#"  data-id="${i}">${chrome.i18n.getMessage("delete")}</a>
                        </div>                     
                        <div class="col text-right">                              
                            <a href="#" data-toggle="modal" data-target="#${collections[i].slug}" class="btn  btn-info card-link">${chrome.i18n.getMessage('nav_manage')}</a></div>                        
                        </div>
                    </div>
                </div>`;
            let list = `<ul>`;
            for (let y in collections[i].items) {
                let pack = collections[i].items[y];
                if (pack == null)
                    continue;
                list += `<li class="text-left" id="pack${pack.id}"><img src="${pack.image}" style="width: 60px"><span class="pack-name">${pack.name}</span> <a href="#" data-pack-id="${pack.id}" data-collection-slug="${collections[i].slug}" class="delete-pack">${chrome.i18n.getMessage("delete")}</a></li>`;
            }
            list += "</ol>"
            let packs = `                               
                <div class="modal fade" id="${collections[i].slug}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${collections[i].name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                             ${list}
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>`;
            collection = collection;
            $("#dialogs").append(packs)
            wrapFiles.prepend(collection);
        }
    }

    $(".delete-pack").on('click', function (e) {
        var packId = $(this).data('pack-id'),
            collection = $(this).data('collection-slug'),
            elem = $(this);
        $(`#pack${packId}`).remove();
        var tmp = [];
        for (var i in collections[collection].items) {
            var item = collections[collection].items[i];
            if (item.id == packId) {
            } else {
                tmp.push(item)
            }
        }
        if (tmp.length == 0) {
            delete collections[collection];
            $(`#${collection}`).modal("hide");
            $(`[data-id=${collection}]`).remove()
        } else {
            collections[collection].items = tmp;
        }
        chrome.storage.local.set({collection: collections});
        e.preventDefault();

    })

    $(".delete").on('click', function (e) {
        var id = $(this).data('id'),
            elem = $(this),
            tmp = collections[id];
        delete collections[id];
        chrome.storage.local.set({collection: collections});
        chrome.storage.local.remove(tmp.slug);

        setTimeout(function () {
            $(`div[data-id="${id}"]`).hide();
            $(`div[data-id="${id}"]`).remove();
        }, 200);
        e.preventDefault()
    });
    (new Localize()).init();


});


// serviceWorker
const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

// search
let search_items = [
    {
        name: "Discord",
        text: "TrugeDrop#1929",
        url: "https://discordapp.com/users/803942256482582568",
        target: "_blank"
    },
    {
        name: "GitHub",
        text: "TrugeDrop",
        url: "https://github.com/TrugeDrop",
        target: "_blank"
    },
    {
        name: "E-Mail",
        text: "trugedrop@yandex.com",
        url: "mailto:trugedrop@yandex.com",
        target: "_blank"
    }
];

$.ajax({
    type: "POST",
    url: "/blogs",
    success: function(result){
        result.forEach(blog => {
           search_items.push({
              name: blog.name,
              text: blog.description,
              url: `/blog/${blog.slug_name}`
           });
        });
    }
});

$('#search-navbar').on("keyup", function(event){
    let value = event.target.value;
    value = value.toLowerCase();
    
    if(value === "" || !value) return $('#search-navbar-items').html("");
    
    let items = search_items.filter(function(item){
        let item_name = item.name.toLowerCase();
        return item_name.indexOf(value) > -1
    });
    
    if(!items) return $('#search-navbar-items').html("");
    
    $('#search-navbar-items').html("");
    
    items.forEach(item => {
       $('#search-navbar-items').append(`<a href="${item.url}" ${ item.target === "_blank" ? `target="_blank"` : "" } class="flex items-center justify-between py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">${item.name} ${item.url && item.target === "_blank" ? `<i class='bx bx-link-external'></i>` : ""}</a>`); 
    });
});
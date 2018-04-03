$(document).ready(function () {
    $("#submit").click(function () {
        key = $("#key").val();
        $.post("/listings/search/", {key: key}, function (dataList) {
            var resultList = document.getElementById('resultlist');
            $('#resultlist').empty();
            for (var i = 0; i < dataList.length; i++) {
                var listItem = document.createElement('li');
                var titlePara = document.createElement('h4');
                var thumbnailImg = document.createElement('img');
                var descrPara = document.createElement('p');
                var addrPara = document.createElement('p');
                var zipcodePara = document.createElement('p');
                titlePara.textContent = dataList[i].title;
                descrPara.textContent = dataList[i].description;
                addrPara.textContent = dataList[i].address;
                zipcodePara.textContent = dataList[i].zipcode;
                thumbnailImg.src = dataList[i].picture;
                thumbnailImg.width = '80';
                thumbnailImg.height = '80'
                listItem.appendChild(titlePara);
                listItem.appendChild(thumbnailImg);
                listItem.appendChild(descrPara);
                listItem.appendChild(addrPara);
                listItem.appendChild(zipcodePara);
                resultlist.appendChild(listItem);
                addMarker(new google.maps.LatLng(dataList[i].latitude, dataList[i].longitude));
            }
            map.panTo(new google.maps.LatLng(dataList[0].latitude, dataList[0].longitude));
            $(document).ready(function () {
                $("ul#resultlist li").click(function () {
                    map.panTo(new google.maps.LatLng(dataList[$(this).index()].latitude, dataList[$(this).index()].longitude));
                });
            });
        });
    });
});
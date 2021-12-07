$(function () {
  let arrayAreas = [];
  let areasObject = {};
  let areas = {};

  let jsonAreas;
  const url = "https://covid-api.mmediagroup.fr/v1/cases/";
  $.getJSON(url)
    .done(function (data) {
      $.each(data, function (index) {
        const countryabbreviation = data[index].All.abbreviation;
        if (countryabbreviation) {
          const countryObject = {
            value: `${data[index].All.confirmed}`,
            href: "#",
            tooltip: {
              content: `<span style="font-weight:bold;">${data[index].All.country}</span><br /> Cases: ${data[index].All.confirmed}<br /> Deaths: ${data[index].All.deaths}`,
            },
          };
          // areasObject[countryabbreviation] = countryObject;
          areas[countryabbreviation] = countryObject;
          // console.log(areas[countryabbreviation]);
          // console.log(countryObject);
        }
      });
      $(".mapcontainer").mapael({
        map: {
          name: "world_countries",
          defaultArea: {
            attrs: {
              stroke: "#fff",
              "stroke-width": 1,
            },
          },
        },
        legend: {
          area: {
            title: "Countries cases",
            slices: [
              {
                max: 100,
                attrs: {
                  fill: "#ffe6e6",
                },
                label: "100 or less",
              },
              {
                min: 101,
                max: 1000,
                attrs: {
                  fill: "#ffcccc",
                },
                label: "100-1,000",
              },
              {
                min: 1001,
                max: 10000,
                attrs: {
                  fill: "#ff9999",
                },
                label: "1,001-10,000",
              },
              {
                min: 10001,
                max: 100000,
                attrs: {
                  fill: "#ff8080",
                },
                label: "10,001-100,000",
              },
              {
                min: 100001,
                max: 1000000,
                attrs: {
                  fill: "#ff6666",
                },
                label: "100,001-1,000,000",
              },
              {
                min: 1000001,
                max: 10000000,
                attrs: {
                  fill: "#ff3333",
                },
                label: "1,000,001-10,000,000",
              },
              {
                min: 10000001,
                attrs: {
                  fill: "#ff0000",
                },
                label: "More than 100,000,000",
              },
            ],
          },
        },
        areas,
        // areas: {
        //   AF: {
        //     value: "18631",
        //     href: "#",
        //     tooltip: {
        //       content: `<span style="font-weight:bold;">Andorra</span><br /> Cases: 18631<br /> Deaths: 133`,
        //     },
        //   },
        // },
      });
    })
    .fail(function () {
      console.log("Request failed");
      const map = $(".mapcontainer");
      map.empty();
      map.append(`<p class="error">⚠Data fetch failed</p>`);
    })
    .always(function () {});
});

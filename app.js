const puppeteer = require("puppeteer");

let bookingUrl =
  "https://www.booking.com/searchresults.fr.html?label=gen173nr-1FCAEoggI46AdIM1gEaE2IAQGYAQ24AQfIAQzYAQHoAQH4AQuIAgGoAgO4Au6aw-kFwAIB&sid=6a1febfd3cd4b13a0803e5b86585e568&sb=1&src=searchresults&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Fsearchresults.fr.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaE2IAQGYAQ24AQfIAQzYAQHoAQH4AQuIAgGoAgO4Au6aw-kFwAIB%3Bsid%3D6a1febfd3cd4b13a0803e5b86585e568%3Btmpl%3Dsearchresults%3Bclass_interval%3D1%3Bdest_id%3D-2140479%3Bdest_type%3Dcity%3Bdtdisc%3D0%3Bfrom_sf%3D1%3Bgroup_adults%3D2%3Bgroup_children%3D0%3Binac%3D0%3Bindex_postcard%3D0%3Blabel_click%3Dundef%3Bno_rooms%3D1%3Boffset%3D0%3Bpostcard%3D0%3Broom1%3DA%252CA%3Bsb_price_type%3Dtotal%3Bshw_aparth%3D1%3Bslp_r_match%3D0%3Bsrc%3Dindex%3Bsrc_elem%3Dsb%3Bsrpvid%3D6e848b7af7a200cd%3Bss%3Damsterdam%3Bss_all%3D0%3Bssb%3Dempty%3Bsshis%3D0%26%3B&ss=Londres%2C+Grand+Londres%2C+Royaume-Uni&is_ski_area=&ssne=Amsterdam&ssne_untouched=Amsterdam&city=-2140479&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&from_sf=1&ss_raw=londres&ac_position=0&ac_langcode=fr&ac_click_type=b&dest_id=-2601889&dest_type=city&iata=LON&place_id_lat=51.507391&place_id_lon=-0.127634&search_pageview_id=6e848b7af7a200cd&search_selected=true&search_pageview_id=6e848b7af7a200cd&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(bookingUrl);

  // get hotel details
  let hotelData = await page.evaluate(() => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll(
      "div.sr_property_block[data-hotelid]"
    );
    // get the hotel data
    hotelsElms.forEach(hotelelement => {
      let hotelJson = {};
      try {
        hotelJson.name = hotelelement.querySelector(
          "span.sr-hotel__name"
        ).innerText;
        hotelJson.reviews = hotelelement.querySelector(
          "span.review-score-widget__subtext"
        ).innerText;
        hotelJson.rating = hotelelement.querySelector(
          "span.review-score-badge"
        ).innerText;
        if (hotelelement.querySelector("strong.price")) {
          hotelJson.price = hotelelement.querySelector(
            "strong.price"
          ).innerText;
        }
      } catch (exception) {}
      hotels.push(hotelJson);
    });
    return hotels;
  });

  console.dir(hotelData);
})();

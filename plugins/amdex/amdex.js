/*
    [AmDeX] : Actor MetaData Extractor v1.5 (2020-MAY-23)

    MOST RECENT CHANGES:
        - FEATURE: WikiPorno Added as a new Source
        - FEATURE: PornHub Added as a new Source
        - FEATURE: Ability to download GIFs from Pornhub
        - FEATURE: Ability to get Hero Images (Cover Images) from Pornhub

    This "extensible" Actor plugin currently extracts actor information from:
        - FreeOnes
            - Date of Birth (See IMPORTANT section below)
            - City of Birth
            - State of Birth
            - Nation of Birth
            - Actor Image
        - BabePedia
            - Actor Aliases
            - Actor Images (up to two)
        - ThePornDB
            - Actor Bio
            - Actor Aliases
            - Gender
            - BirthPlace
            - Active
            - Astrology
            - Ethnicity
            - Nationality
            - Hair Color
            - Weight (Metric/Imperial)
            - Height (Metric/Imperial)
            - Measurements
            - Cup Size
            - Tattoos
            - Piercings
            - Waist
            - Hips
            - Chest Size
        - Wiki Porno
            - Measurements
            - Cup Size
            - Tattoos
            - Piercings
            - Birthplace
            - Weight
            - Height
            - Eye Color
            - Hair Color
            - Ethnicity
            - Astrology
            - Years Active
            - Waist
            - Hips
            - Chest Size
            - Twitter
        - PornHub
            - Hero/Cover Image
            - Actor Bio
            - Height
            - Weight
            - Birthplace


    IMPORTANT: If you are using Linux without a GUI (e.g., Ubuntu Server), then you need to ensure your server's
                time zone is correctly set. See instructions below:
                https://linoxide.com/linux-command/set-time-date-timezone-ubuntu-linux/
    
    Failure to set correct time zone may result in actress birthdates being offset by 1 day.

    This plugin is customizable which allows you to:
        - Toggle individual pieces of data extracted if you don't want to store everything
        - Select a source for an image (avatar, thumbnail, alt thumbnail) or date of birth
        - Choose between metric or imperial units for height and weight

    Unfortunately, this requires a massive configuration included as plugin arguments.
    Please use the initial plugin configuration provided below in your config file.

    Set individual settings as true/false as desired.
    To extract a certain custom field (located within custom_field_map for each source),
        create a custom field within the Porn Manager and add its EXACT NAME next to the
        field you would like to extract.
        Leave the field as an empty string if you do not want to extract a certain custom field.

    Set debug to true if you want to see extracted data in the console without saving anything.

    EXTENDING THIS PLUGIN TO SUPPORT A NEW SOURCE:
        1. Add your source information in the config file under "source_settings"
        2. Look through this plugin for comments containing [EXTEND] and add your code there
        3. Respect user settings
        4. ???
        5. Profit

    CURRENTLY-NOT-IMPLEMENTED:
        - use_next_source_on_failure

    Thanks @john4valor for help with TPDB and FreeOnes

    Enjoy!
        -github.com/slybot

    If your config file is in JSON:
    "PLUGINS": {
        "AmDeX": {
            "path": "./plugins/amdex.js",
            "args": {
                "debug": false,
                "set_dateofbirth": true,
                "set_avatar": true,
                "set_nationality": true,
                "set_thumbnail": true,
                "set_alt_thumbnail": true,
                "set_hero_img": true,
                "use_thumbnail_as_avatar_if_not_available": false,
                "set_alias": true,
                "set_bio": true,
                "dateofbirth_source": "freeones",
                "bio_source": "pornhub",
                "avatar_source": "freeones",
                "thumbnail_source": "babepedia",
                "alt_thumbnail_source": "babepedia",
                "hero_img_source": "pornhub",
                "nationality_source": "freeones",
                "use_next_source_on_failure": false,
                "prefer_metric": false,
                "source_settings": {
                    "freeones": {
                        "enabled": true,
                        "get_aliases": true,
                        "custom_field_map": {
                            "birthplace": "",
                            "eye_color" : "",
                            "ethnicity" : "",
                            "hair_colour" : ""
                        }
                    },
                    "babepedia": {
                        "enabled": true,
                        "get_aliases": true,
                        "custom_field_map": {}
                    },
                    "tpdb": {
                        "enabled": true,
                        "extract_only_if_source_matches_name_exactly": true,
                        "get_performer_bio": true,
                        "get_all_bios": false,
                        "get_aliases": true,
                        "get_all_images": false,
                        "custom_field_map": {
                            "gender": "",
                            "birthplace": "",
                            "active": "",
                            "astrology": "",
                            "ethnicity": "",
                            "hair_colour": "",
                            "weight": "",
                            "height": "",
                            "measurements": "",
                            "cupsize": "",
                            "tattoos": "",
                            "piercings": "",
                            "waist": "",
                            "hips": "",
                            "chest_size": ""
                        }
                    },
                    "wikiporno": {
                        "enabled": true,
                        "get_aliases": false,
                        "custom_field_map": {
                            "measurements": "",
                            "cupsize": "",
                            "tattoos": "",
                            "piercings": "",
                            "birthplace": "",
                            "weight": "",
                            "height": "",
                            "eyeColor": "",
                            "hairColor": "",
                            "ethnicity": "",
                            "astrology": "",
                            "years_active": "",
                            "waist": "",
                            "hips": "",
                            "chest_size": "",
                            "twitter": ""
                        }
                    },
                    "pornhub": {
                        "enabled": true,
                        "get_gifs": true,
                        "download_gifs_max_count": 2,
                        "custom_field_map": {
                            "birthplace": "",
                            "height": "",
                            "weight": ""
                        }
                    }
                }
            }
        }
    },
    "PLUGIN_EVENTS": {
        "actorCreated": [
            "AmDeX"
        ],
        "actorCustom": [
            "AmDeX"
        ]
    }
    

    If your config file is in YAML:
    ---
    PLUGINS:
      AmDeX:
        path: "./plugins/amdex.js"
        args:
          debug: false
          set_dateofbirth: true
          set_avatar: true
          set_nationality: true
          set_thumbnail: true
          set_alt_thumbnail: true
          set_hero_img: true
          use_thumbnail_as_avatar_if_not_available: false
          set_alias: true
          set_bio: true
          dateofbirth_source: freeones
          bio_source: pornhub
          avatar_source: freeones
          thumbnail_source: babepedia
          alt_thumbnail_source: babepedia
          hero_img_source: pornhub
          nationality_source: freeones
          use_next_source_on_failure: false
          prefer_metric: false
          source_settings:
            freeones:
              enabled: true
              get_aliases: true
              custom_field_map:
                birthplace: ''
                eye_color: ''
                ethnicity: ''
                hair_colour: ''
            babepedia:
              enabled: true
              get_aliases: true
              custom_field_map: {}
            tpdb:
              enabled: true
              extract_only_if_source_matches_name_exactly: true
              get_performer_bio: true
              get_all_bios: false
              get_aliases: true
              get_all_images: false
              custom_field_map:
                gender: ''
                birthplace: ''
                active: ''
                astrology: ''
                ethnicity: ''
                hair_colour: ''
                weight: ''
                height: ''
                measurements: ''
                cupsize: ''
                tattoos: ''
                piercings: ''
                waist: ''
                hips: ''
                chest_size: ''
            wikiporno:
                enabled: true
                get_aliases: false
                custom_field_map:
                    measurements: ''
                    cupsize: ''
                    tattoos": ''
                    piercings: ''
                    birthplace: ''
                    weight: ''
                    height: ''
                    eyeColor: ''
                    hairColor: ''
                    ethnicity: ''
                    astrology: ''
                    years_active: ''
                    waist: ''
                    hips: ''
                    chest_size: ''
                    twitter: ''
            pornhub:
                enabled: true
                get_gifs: true
                download_gifs_max_count: 2
                custom_field_map:
                    birthplace: ''
                    height: ''
                    weight: ''

      PLUGIN_EVENTS:
        actorCreated:
            - AmDeX
        actorCustom:
            - AmDeX
*/
module.exports = async ({
    event,
    args,
    $axios,
    $moment,
    $cheerio,
    $throw,
    $log,
    actorName,
    $createImage
}) => {
    let result = {};
    let tasks = [];
    $log(`[AMDX] MSG: START ${actorName}`);
    if (event != "actorCreated" && event != "actorCustom") {
        $throw("[AMDX] ERR: Plugin used for unsupported event");
    }
    // TODO: Check integrity of provided args in config file
    if (args.source_settings === undefined) {
        $throw("[AMDX] ERR: Missing source_settings in plugin args");
    }
    const src_config = args.source_settings;
    // Add each source to tasks if enabled in config
    // [EXTEND]: Add your new API getter to the tasks Array.
    if (src_config.freeones !== undefined && src_config.freeones.enabled) {
        tasks.push(get_info_from_freeones(actorName, src_config.freeones));
    }
    if (src_config.babepedia !== undefined && src_config.babepedia.enabled) {
        tasks.push(get_info_from_babepedia(actorName, src_config.babepedia));
    }
    if (src_config.tpdb !== undefined && src_config.tpdb.enabled) {
        tasks.push(get_info_from_tpdb(actorName, src_config.tpdb));
    }
    if (src_config.wikiporno !== undefined && src_config.wikiporno.enabled) {
        tasks.push(get_info_from_wikiporno(actorName, src_config.wikiporno));
    }
    if (src_config.pornhub !== undefined && src_config.pornhub.enabled) {
        tasks.push(get_info_from_pornhub(actorName, src_config.pornhub));
    }
    // Fetch data from all sources concurrently
    const sourced_info = await Promise.all(tasks).catch(e => $log(`"[AMDX] ERR: ${e}`));
    // Create result object by processing each source response individually
    sourced_info.forEach(element => {
        $log(`[AMDX] Processing data from ${element.id}`);
        // Set avatar
        if (args.set_avatar && args.avatar_source === element.id) {
            result['avatar'] = element.img_urls.shift();
        }
        // TODO: implement use next source on failure here
        // Set thumbnail and alt thumbnail
        if (args.set_thumbnail && args.thumbnail_source === element.id && args.set_alt_thumbnail && args
            .alt_thumbnail_source) {
            if (element.img_urls.length >= 2) {
                // BabePedia hack where first image is better as an alt thumbnail
                result['altThumbnail'] = element.img_urls.shift();
                result['thumbnail'] = element.img_urls.shift();
            } else if (element.img_urls.length == 1) {
                result['thumbnail'] = element.img_urls.shift();
            }
        } else if (args.set_thumbnail && args.thumbnail_source === element.id) {
            result['thumbnail'] = element.img_urls.shift();
        } else if (args.set_alt_thumbnail && args.alt_thumbnail_source === element.id) {
            result['altThumbnail'] = element.img_urls.shift();
        } else if (args.set_hero_img && args.hero_img_source === element.id) {
            result['hero'] = element.hero;
        }
        // Set Aliases
        if (args.set_alias && src_config[element.id].get_aliases !== undefined && src_config[element.id]
            .get_aliases) {
            if (result['aliases'] === undefined) {
                result['aliases'] = [];
            }
            if (element['alias_list'] !== undefined) {
                element['alias_list'].forEach(al => {
                     // Remove whitespace from alias
                     al = al.trim();
                     // Ensure duplicate aliases are not included
                     if (!result['aliases'].includes(al)) {
                         result['aliases'].push(al);
                     }
                });
            }
        }
        // Set Bio
        if (args.set_bio && args.bio_source === element.id) {
            if (element.bio !== undefined) {
                if (element.bio instanceof Set) {
                    // Join with newline if multiple bios requested by user.
                    result['description'] = Array.from(element.bio).join('\n');
                } else {
                    // Single bio requested by user.
                    result['description'] = element.bio;
                }
            }
        }
        // Set Birth date
        if (args.set_dateofbirth && args.dateofbirth_source === element.id) {
            // Fix date issue with timestamp causing dates to appear
            // one day behind or ahead of actual birthdate due to
            // user time zone.
            let tz_offset_to_utc = (new Date).getTimezoneOffset() * 60000;
            result['bornOn'] = element.born_on + tz_offset_to_utc;
        }
        // Set Custom Fields
        if (result['custom'] === undefined) {
            result['custom'] = {};
        }
        const src_custom_fields = src_config[element.id].custom_field_map;
        // Set Custom Fields: FreeOnes
        if (element.id == "freeones") {
            if (args.set_nationality && args.nationality_source === element.id && element.extra_info !==
                undefined && element.extra_info.nation_of_birth) {
                result['nationality'] = get_country_code(element.extra_info.nation_of_birth);
            }
            if (is_enabled_custom_field(element, "birthplace", src_custom_fields)) {
                result['custom'][src_custom_fields.birthplace] = element.extra_info.birthplace;
            }
            if (is_enabled_custom_field(element, "eye_color", src_custom_fields)) {
                result['custom'][src_custom_fields.eye_color] = element.extra_info.eye_color;
            }
            if (is_enabled_custom_field(element, "ethnicity", src_custom_fields)) {
                result['custom'][src_custom_fields.ethnicity] = element.extra_info.ethnicity;
            }
            if (is_enabled_custom_field(element, "hair_colour", src_custom_fields)) {
                result['custom'][src_custom_fields.hair_colour] = element.extra_info.hair_colour;
            }
        }
        // Set Custom Fields: TPDB
        else if (element.id == "tpdb") {
            if (args.set_nationality && args.nationality_source === element.id && element.extra_info !==
                undefined && element.extra_info.nationality) {
                result['nationality'] = get_country_code(element.extra_info.nationality);
            }
            if (is_enabled_custom_field(element, "gender", src_custom_fields)) {
                result['custom'][src_custom_fields.gender] = element.extra_info.gender;
            }
            if (is_enabled_custom_field(element, "birthplace", src_custom_fields)) {
                result['custom'][src_custom_fields.birthplace] = element.extra_info.birthplace;
            }
            // NOTE: active is expected to be a bool or a string in the UI
            if (is_enabled_custom_field(element, "active", src_custom_fields)) {
                result['custom'][src_custom_fields.active] = element.extra_info.active;
            }
            if (is_enabled_custom_field(element, "astrology", src_custom_fields)) {
                const astro = element.extra_info.astrology.split(" ")[0].trim();
                result['custom'][src_custom_fields.astrology] = astro;
            }
            if (is_enabled_custom_field(element, "ethnicity", src_custom_fields)) {
                result['custom'][src_custom_fields.ethnicity] = element.extra_info.ethnicity;
            }
            if (is_enabled_custom_field(element, "hair_colour", src_custom_fields)) {
                result['custom'][src_custom_fields.hair_colour] = element.extra_info.hair_colour;
            }
            if (is_enabled_custom_field(element, "weight", src_custom_fields)) {
                // metric is default for TPDB, convert if requested by user
                let wgt = parseInt(element.extra_info.weight.split("k")[0].trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    wgt *= 2.2;
                    wgt = Math.round((wgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.weight] = wgt;
            }
            if (is_enabled_custom_field(element, "height", src_custom_fields)) {
                // default is in metric for TPDB, convert if requested by user
                let hgt = parseInt(element.extra_info.height.split("c")[0].trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    hgt *= 0.033;
                    hgt = Math.round((hgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.height] = hgt;
            }
            if (element.extra_info && element.extra_info.measurements) {
                if (is_enabled_custom_field(element, "measurements", src_custom_fields)) {
                    result['custom'][src_custom_fields.measurements] = element.extra_info.measurements;
                }
                if (is_enabled_custom_field(element, "cupsize", src_custom_fields)) {
                    const cup = element.extra_info.measurements.split("-")[0].substr(2);
                    result['custom'][src_custom_fields.cupsize] = cup;
                }
                if (is_enabled_custom_field(element, "waist", src_custom_fields)) {
                    const wst = element.extra_info.measurements.split("-")[1].substr(0, 2);
                    result['custom'][src_custom_fields.waist] = wst;
                }
                if (is_enabled_custom_field(element, "hips", src_custom_fields)) {
                    const hps = element.extra_info.measurements.split("-")[2].substr(0, 2);
                    result['custom'][src_custom_fields.hips] = hps;
                }
                if (is_enabled_custom_field(element, "measurements", src_custom_fields)) {
                    const csz = element.extra_info.measurements.split("-")[0].substr(0, 2);
                    result['custom'][src_custom_fields.chest_size] = csz;
                }
            }
            if (is_enabled_custom_field(element, "tattoos", src_custom_fields)) {
                result['custom'][src_custom_fields.tattoos] = element.extra_info.tattoos;
            }
            if (is_enabled_custom_field(element, "piercings", src_custom_fields)) {
                result['custom'][src_custom_fields.piercings] = element.extra_info.piercings;
            }
        }
        // Set Custom Fields: WikiPorno
        else if (element.id == "wikiporno") {
            if (is_enabled_custom_field(element, "height", src_custom_fields)) {
                // default is in metric for TPDB, convert if requested by user
                let hgt = parseInt(element.extra_info.height.split("(")[1].split(')')[0].replace("cm",
                    "").trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    hgt *= 0.033;
                    hgt = Math.round((hgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.height] = hgt;
            }
            if (is_enabled_custom_field(element, "weight", src_custom_fields)) {
                // metric is default for TPDB, convert if requested by user
                let wgt = parseInt(element.extra_info.weight.split("(")[1].split(')')[0].replace("kg",
                    "").trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    wgt *= 2.2;
                    wgt = Math.round((wgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.weight] = wgt;
            }
            if (is_enabled_custom_field(element, "twitter", src_custom_fields)) {
                result['custom'][src_custom_fields.twitter] = element.extra_info.twitter;
            }
            if (is_enabled_custom_field(element, "birthplace", src_custom_fields)) {
                result['custom'][src_custom_fields.birthplace] = element.extra_info.birthplace;
            }
            if (is_enabled_custom_field(element, "years_active", src_custom_fields)) {
                result['custom'][src_custom_fields.years_active] = element.extra_info.years_active;
            }
            if (element.measurements) {
                if (is_enabled_custom_field(element, "measurements", src_custom_fields)) {
                    result['custom'][src_custom_fields.measurements] = element.extra_info.measurements;
                }
                if (is_enabled_custom_field(element, "cupsize", src_custom_fields)) {
                    const cup = element.extra_info.measurements.split("-")[0].substr(2);
                    result['custom'][src_custom_fields.cupsize] = cup;
                }
                if (is_enabled_custom_field(element, "waist", src_custom_fields)) {
                    const wst = element.extra_info.measurements.split("-")[1].substr(0, 2);
                    result['custom'][src_custom_fields.waist] = wst;
                }
                if (is_enabled_custom_field(element, "hips", src_custom_fields)) {
                    const hps = element.extra_info.measurements.split("-")[2].substr(0, 2);
                    result['custom'][src_custom_fields.hips] = hps;
                }
                if (is_enabled_custom_field(element, "measurements", src_custom_fields)) {
                    const csz = element.extra_info.measurements.split("-")[0].substr(0, 2);
                    result['custom'][src_custom_fields.chest_size] = csz;
                }
            }
        } else if (element.id == "pornhub") {
            if (is_enabled_custom_field(element, "height", src_custom_fields)) {
                // default is in metric for TPDB, convert if requested by user
                let hgt = parseInt(element.extra_info.height.split("(")[1].split(')')[0].replace("cm",
                    "").trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    hgt *= 0.033;
                    hgt = Math.round((hgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.height] = hgt;
            }
            if (is_enabled_custom_field(element, "weight", src_custom_fields)) {
                // metric is default for TPDB, convert if requested by user
                let wgt = parseInt(element.extra_info.weight.split("(")[1].split(')')[0].replace("kg",
                    "").trim());
                if (!args["prefer_metric"]) {
                    // convert to imperial
                    wgt *= 2.2;
                    wgt = Math.round((wgt + Number.EPSILON) * 100) / 100;
                }
                result['custom'][src_custom_fields.weight] = wgt;
            }
            if (src_config.pornhub.get_gifs && src_config.pornhub.download_gifs_max_count !== 0) {
                result['gifs'] = element.gifs.slice(0, Math.min(element.gifs.length, src_config.pornhub
                    .download_gifs_max_count));
                // await Promise.all(gif_dl_tasks).catch(e => $log(`"[AMDX] ERR: GIF downloads failed -> ${e}`));
            }
        }
        // [EXTEND]: Add Custom Field Processing for your Source Here
    });
    // All data has been set in the results object at this point except for images
    // Download GIFs if required
    if (src_config.pornhub.get_gifs && src_config.pornhub.download_gifs_max_count !== 0) {
        $log("[AMDX] MSG: Downloading GIFs");
        result = await save_gifs_from_result(actorName, result);
    }
    // Download images and replace URLs with image ids in result object
    $log("[AMDX] MSG: Downloading Images");
    result = await save_images_from_result(actorName, result);
    if (args.use_thumbnail_as_avatar_if_not_available && !result['avatar']) {
        if (result['thumbnail']) {
            $log("[AMDX] MSG: Avatar NOT available. Using Thumbnail as Avatar");
            result['avatar'] = result['thumbnail'];
        } else if (result['altThumbnail']) {
            $log("[AMDX] MSG: Avatar and Thumbnail NOT available. Using Alt Thumbnail as Avatar");
            result['avatar'] = result['altThumbnail'];
        }
    }
    // Do not return/save results if running in debug mode
    if (args.debug) {
        $log("[AMDX] MSG: Final Result:")
        $log(JSON.stringify(result));
        result = {};
    }
    $log(`[AMDX] MSG: END ${actorName}`);
    return result;
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // Returns true if a custom field is enabled in the plugin config
    function is_enabled_custom_field(src_element, custom_field, src_custom_fields) {
        try {
            if (src_element.extra_info !== undefined && src_element.extra_info[custom_field] !== undefined &&
                src_element.extra_info[custom_field] && src_element.extra_info[custom_field] !== "" &&
                src_custom_fields[custom_field] !== "") {
                return true;
            }
        } catch (error) {
            $log("[AMDX] ERR: is_enabled_custom_field() -> ", error);
            return false;
        }
        return false;
    }
    // Downloads GIFs from URL
    async function save_gifs_from_result(actor_name, src_result) {
        var gif_dl_tasks = src_result.gifs.map(url => {
            return $createImage(url, `${actorName} (gif-${url.slice(26).split(".")[0]})`)
        });
        const dl_imgs = await Promise.all(gif_dl_tasks).catch(e => $log(
            `"[AMDX] ERR: GIF download failed -> ${e}`));
        src_result['gifs'] = dl_imgs;
        return src_result;
    }
    // Downloads image and replaces URL in src_result with Image ID
    async function save_images_from_result(actor_name, src_result) {
        // Use async only if all images are present, or else image order gets screwed up
        if (src_result.avatar && src_result.thumbnail && src_result.altThumbnail) {
            $log("[AMDX] MSG: ALL Image URLs Available. Downloading CONCURRENTLY");
            let img_dl_tasks = [];
            img_dl_tasks.push($createImage(src_result['avatar'], `${actor_name} (profile picture)`));
            img_dl_tasks.push($createImage(src_result['thumbnail'], `${actor_name} (thumb)`));
            img_dl_tasks.push($createImage(src_result['altThumbnail'], `${actor_name} (altthumb)`));
            // Doing it this way as hero image will likely be selected by most
            // but is rarely available. Ensuring concurrent mode is used more often by hiding
            // the hero check within
            if (src_result.hero) {
                img_dl_tasks.push($createImage(src_result['hero'], `${actor_name} (hero)`));
            }
            const dl_imgs = await Promise.all(img_dl_tasks).catch(e => $log(
                `"[AMDX] ERR: Image download failed -> ${e}`));
            src_result['avatar'] = dl_imgs[0];
            src_result['thumbnail'] = dl_imgs[1];
            src_result['altThumbnail'] = dl_imgs[2];
            if (src_result.hero) {
                src_result['hero'] = dl_imgs[3];
            }
        } else if (src_result.avatar || src_result.thumbnail || src_result.altThumbnail || src_result
            .hero) {
            $log("[AMDX] MSG: SOME Image URLs Available. Downloading SEQUENTIALLY");
            if (src_result.avatar !== undefined && src_result.avatar.startsWith('http')) {
                src_result['avatar'] = await $createImage(src_result['avatar'],
                    `${actor_name} (profile picture)`);
            }
            if (src_result.thumbnail !== undefined && src_result.thumbnail.startsWith('http')) {
                src_result['thumbnail'] = await $createImage(src_result['thumbnail'],
                    `${actor_name} (thumb)`);
            }
            if (src_result.altThumbnail !== undefined && src_result.altThumbnail.startsWith('http')) {
                src_result['altThumbnail'] = await $createImage(src_result['altThumbnail'],
                    `${actor_name} (altthumb)`);
            }
            if (src_result.hero !== undefined && src_result.hero.startsWith('http')) {
                src_result['hero'] = await $createImage(src_result['hero'], `${actor_name} (hero)`);
            } else {
                $log("[AMDX] ERR: No Image URLs available");
            }
        }
        return src_result;
    }
    // Get Actor data sourced from Pornhub
    async function get_info_from_pornhub(actor_name, settings) {
        $log("[AMDX] MSG: START PornHub Data Extraction");
        let result = {
            'id': 'pornhub',
            'bio': '',
            'hero': ''
        }
        const pornhub_url =
            `https://www.pornhub.com/pornstar/${actor_name.replace(".", "").replace(/ /g, "-")}`;
        let pornhub_html = "";
        var pornhub_response = (await $axios.get(pornhub_url, {
            validateStatus: false
        }));
        let $ = null;
        if (pornhub_response.status == 200) {
            pornhub_html = pornhub_response.data;
            $ = $cheerio.load(pornhub_html);
            result['bio'] = $(".js-bioText").text().trim();
            result['hero'] = $(".coverImage").children('img').eq(0).attr('src');
            result['extra_info'] = {};
            $(".infoPiece").each(function(i, e) {
                var x = $(this);
                var info = x.find('span').text().split(':');
                if (info[0] === 'Born') {
                    const yyyymmdd = info[1].match(/\d\d\d\d-\d\d-\d\d/);
                    if (yyyymmdd && yyyymmdd.length) {
                        const date = yyyymmdd[0];
                        const timestamp = $moment(date, "YYYY-MM-DD").valueOf();
                        result['born_on'] = timestamp;
                    }
                } else if (info[0] === 'Birthplace') {
                    result['extra_info']['birthplace'] = info[1];
                } else if (info[0] === 'Height') {
                    result['extra_info']['height'] = info[1];
                } else if (info[0] === 'Weight') {
                    result['extra_info']['weight'] = info[1];
                }
            });
        } else {
            $log("[AMDX] ERR: PornHub Page NOT found");
        }
        const ph_gif_url =
            `https://www.pornhub.com/gifs/search?search=${actor_name.replace(".", "").replace(/ /g, "-")}`;
        let ph_gif_html = "";
        var ph_gif_response = (await $axios.get(ph_gif_url, {
            validateStatus: false
        }));
        if (ph_gif_response.status == 200) {
            ph_gif_html = ph_gif_response.data;
            $ = $cheerio.load(ph_gif_html);
            $log("gif blocks");
            var ph_gif_urls = [];
            $(".gifVideoBlock").each(function(i, e) {
                var x = $(this);
                ph_gif_urls.push(`https://dl.phncdn.com${x.find('a').attr('href')}.gif`);
            });
            result['gifs'] = ph_gif_urls;
        } else {
            $log("[AMDX] ERR: PornHub GIFs Page NOT found");
        }
        $log("[AMDX] MSG: END PornHub Data Extraction");
        return result;
    }
    // Get Actor data sourced from WikiPorno
    async function get_info_from_wikiporno(actor_name, settings) {
        // TODO: Get Image if available. Image link available at: https://www.wikiporno.org/wiki/File:{FirstName}_{LastName}.jpg
        $log("[AMDX] MSG: START WikiPorno Data Extraction");
        let result = {
            'id': 'wikiporno',
            'alias_list': [],
        }
        const wikiporno_url =
            `https://www.wikiporno.org/wiki/${actor_name.replace(".", "").replace(/ /g, "_")}`;
        let wikiporno_html = "";
        var wikiporno_response = (await $axios.get(wikiporno_url, {
            validateStatus: false
        }));
        let $ = null;
        if (wikiporno_response.status == 200) {
            wikiporno_html = wikiporno_response.data;
            $ = $cheerio.load(wikiporno_html);
            var data = [];
            // Extract information from table infobox
            $(".infobox").find('tr').each(function(rowIndex, r) {
                var cols = [];
                $(this).find('th,td').each(function(colIndex, c) {
                    cols.push($(c).text());
                });
                data.push(cols);
            });
            result['extra_info'] = {};
            for (let idx = 0; idx < data.length; idx++) {
                if (data[idx].length != 2) {
                    continue;
                }
                if (data[idx][0] === 'Birthday:') {
                    const yyyymmdd = data[idx][1].match(/\d\d\d\d-\d\d-\d\d/);
                    if (yyyymmdd && yyyymmdd.length) {
                        const date = yyyymmdd[0];
                        const timestamp = $moment(date, "YYYY-MM-DD").valueOf();
                        result["born_on"] = timestamp;
                    } else {
                        $log("[AMDX] ERR: WikiPorno Date of Birth NOT found");
                    }
                }
                if (data[idx][0] === 'Birth location:') {
                    result['extra_info']['birthplace'] = data[idx][1];
                }
                if (data[idx][0] === 'Measurements:') {
                    result['extra_info']['measurements'] = data[idx][1];
                }
                if (data[idx][0] === 'Height:') {
                    // TODO: Parse height based on settings
                    result['extra_info']['height'] = data[idx][1];
                }
                if (data[idx][0] === 'Weight:') {
                    result['extra_info']['weight'] = data[idx][1];
                }
                if (data[idx][0] === 'Eye color:') {
                    result['extra_info']['eyeColor'] = data[idx][1];
                }
                if (data[idx][0] === 'Hair color:') {
                    result['extra_info']['hairColor'] = data[idx][1];
                }
                if (data[idx][0] === 'Ethnicity:') {
                    result['extra_info']['ethnicity'] = data[idx][1];
                }
                if (data[idx][0] === 'Tattoos:') {
                    result['extra_info']['tattoos'] = data[idx][1];
                }
                if (data[idx][0] === 'Piercings:') {
                    result['extra_info']['piercings'] = data[idx][1];
                }
                if (data[idx][0] === 'Twitter:') {
                    result['extra_info']['twitter'] = data[idx][1];
                }
                if (data[idx][0] === 'Years Active:') {
                    result['extra_info']['years_active'] = data[idx][1];
                }
                if (data[idx][0] === 'Alias(es):') {
                    result['alias_list'] = data[idx][1].split(",").map(x => x.trim());
                }
                if (data[idx][0] === 'Astrological Sign:') {
                    result['extra_info']['astrology'] = data[idx][1];
                }
            }
        } else {
            $log("[AMDX] ERR: WikiPorno Page NOT found");
        }
        $log("[AMDX] MSG: END WikiPorno Data Extraction");
        return result;
    }
    // Get Actor data sourced from FreeOnes
    async function get_info_from_freeones(actor_name, settings) {
        $log("[AMDX] MSG: START FreeOnes Data Extraction");
        let result = {
            'id': 'freeones',
            'img_urls': []
        };
        const freeones_url =
            `https://www.freeones.xxx/${actor_name.replace(".", "").replace(/ /g, "-")}/profile`;
        let freeones_html = "";
        var freeones_response = (await $axios.get(freeones_url, {
            validateStatus: false
        }));
        let $ = null;
        // Get Date of Birth first
        if (freeones_response.status == 200) {
            freeones_html = freeones_response.data;
            $ = $cheerio.load(freeones_html);
            const first = $(".profile-meta-item a").toArray()[0];
            const href = $(first).attr("href");
            const yyyymmdd = href.match(/\d\d\d\d-\d\d-\d\d/);
            if (yyyymmdd && yyyymmdd.length) {
                const date = yyyymmdd[0];
                const timestamp = $moment(date, "YYYY-MM-DD").valueOf();
                result["born_on"] = timestamp;
            } else {
                $log("[AMDX] ERR: FreeOnes Date of Birth NOT found");
            }
            // Get image if not placeholder
            const freeones_actor_images = $(".img-fluid").toArray();
            const freeones_actor_image_url = $(freeones_actor_images[0]).attr("src").split("?")[0];
            // FreeOnes uses a placeholder image when no image is present. Do not download if placeholder image is found.
            if (!freeones_actor_image_url.endsWith("no-image-teaser.png")) {
                result["img_urls"].push(freeones_actor_image_url);
            } else {
                $log("[AMDX] ERR: FreeOnes No image found for actor");
            }
        } else {
            $log("[AMDX] ERR: FreeOnes Page NOT found");
            return result;
        }
        // Set up extra info for custom fields
        result['extra_info'] = {};
        // Get city of birth
        const bcity_sel = $('[data-test="section-personal-information"] a[href*="placeOfBirth"]');
        const bcity_name = bcity_sel.length ? $(bcity_sel).attr("href").split("=").slice(-1)[0] : null;
        let bplace = "";
        if (!bcity_name) {
            $log("[AMDX] ERR: FreeOnes No city found for actor");
        } else {
            // Get state of birth
            const bstate_sel = $('[data-test="section-personal-information"] a[href*="province"]');
            const bstate_name = bstate_sel.length ? $(bstate_sel).attr("href").split("=").slice(-1)[0] :
                null;
            if (!bstate_name) {
                $log("[AMDX] ERR: FreeOnes No state found for actor");
                bplace = bcity_name;
            } else {
                // US states in FreeOnes appear like: GA - Georgia
                // Just keep the state code
                bplace = bcity_name + ', ' + bstate_name.split("-")[0].trim();
            }
        }
        // Set birthplace using available information
        result['extra_info']['birthplace'] = bplace;
        // Get nation of birth
        const bnation_sel = $('[data-test="section-personal-information"] a[href*="country%5D"]');
        const bnation_name = bnation_sel.length ? $(bnation_sel).attr("href").split("=").slice(-1)[0] :
        null;
        if (!bnation_name) {
            $log("[AMDX] ERR: FreeOnes No nation found for actor");
        } else {
            result['extra_info']['nation_of_birth'] = bnation_name;
        }
        // Get eye color info
        const eyecol_sel = $('a[href*="eyeColor%5D"]');
        const eyecol_name = eyecol_sel.length ? $(eyecol_sel).attr("href").split("=").slice(-1)[0] : null;
        if (!eyecol_name) {
            $log("[AMDX] ERR: FreeOnes No eye color found for actor");
        } else {
            const eyecol_cap = eyecol_name[0].toUpperCase() + eyecol_name.substring(1);
            result['extra_info']['eye_color'] = eyecol_cap;
        }
        // Get ethnicity info
        const ethnicity_sel = $('a[href*="ethnicity%5D"]');
        const ethnicity_name = ethnicity_sel.length ? $(ethnicity_sel).attr("href").split("=").slice(-1)[
            0] : null;
        if (!ethnicity_sel) {
            $log("[AMDX] ERR: FreeOnes No ethnicity data found for actor");
        } else {
            const ethnicity_cap = ethnicity_name[0].toUpperCase() + ethnicity_name.substring(1);
            result['extra_info']['ethnicity'] = ethnicity_cap;
        }
        //Get hair color
        const haircol_sel = $('a[href*="hairColor%5D"]');
        const haircol_name = haircol_sel.length ? $(haircol_sel).attr("href").split("=").slice(-1)[0] :
        null;
        if (!haircol_name) {
            $log("[AMDX] ERR: FreeOnes No hair color found for actor");
        } else {
            const haircol_cap = haircol_name[0].toUpperCase() + haircol_name.substring(1);
            result['extra_info']['hair_colour'] = haircol_cap;
        }
        $log("[AMDX] MSG: END FreeOnes Data Extraction");
        return result;
    }
    // Get Actor data sourced from BabePedia
    async function get_info_from_babepedia(actor_name, settings) {
        $log("[AMDX] MSG: START BabePedia Data Extraction");
        let result = {
            'id': 'babepedia',
            'img_urls': []
        };
        // Extract Actor aliases and up to two images from BabePedia
        const bpedia_profile_url = `https://www.babepedia.com/babe/${actor_name.replace(/ /g, "_")}`;
        const bpedia_response = (await $axios.get(bpedia_profile_url, {
            validateStatus: false
        }));
        if (bpedia_response.status == 200) {
            const bpedia_page_content = bpedia_response.data;
            const bpedia_cheerio = $cheerio.load(bpedia_page_content);
            const raw_aliases = bpedia_cheerio("#bioarea h2").html()
            // Sometimes there's an extra space in the Aliases section
            if (raw_aliases !== null && (raw_aliases.startsWith("aka  ") || raw_aliases.startsWith(
                "aka "))) {
                // Split aliases by a slash into a list
                const alias_list = raw_aliases.replace("aka  ", "").replace("aka ", "").split(" / ");
                result["alias_list"] = alias_list;
            } else {
                $log("[AMDX] ERR: BabePedia No alias found for actor");
            }
            // This specific URL usually works great as an alternate thumbnail
            const bpedia_thumb_url = bpedia_cheerio("#profimg a").attr("href");
            const bpedia_altthumb_element = bpedia_cheerio(".prof a")[0];
            if (bpedia_altthumb_element) {
                const bpedia_altthumb_url = "https://www.babepedia.com" + bpedia_altthumb_element["attribs"]
                    ["href"];
                result["img_urls"].push(bpedia_altthumb_url);
            } else {
                $log("[AMDX] ERR: BabePedia First image NOT found for actor");
            }
            // This specific URL usually works great as the primary thumbnail
            if (bpedia_thumb_url !== undefined && !bpedia_thumb_url.startsWith("javascript:alert")) {
                const bpedia_thumbnail_url = "https://www.babepedia.com" + bpedia_thumb_url;
                result["img_urls"].push(bpedia_thumbnail_url);
            } else {
                $log("[AMDX] ERR: BabePedia Second image NOT found for actor");
            }
        }
        $log("[AMDX] MSG: END BabePedia Data Extraction");
        return result;
    }
    // Get Actor Data sourced from ThePornDB
    async function get_info_from_tpdb(actor_name, settings) {
        $log("[AMDX] MSG: START TPDB Data Extraction");
        let result = {
            'id': 'tpdb',
            'img_urls': [],
            'bio': new Set()
        };
        const tpdb_perf_search_url =
            `https://master.metadataapi.net/api/performers?q=${encodeURI(actor_name)}`;
        const tpdb_perf_search_response = (await $axios.get(tpdb_perf_search_url, {
            validateStatus: false
        }));
        if (tpdb_perf_search_response.status != 200 || tpdb_perf_search_response.data === undefined) {
            $log("[AMDX] ERR: TPDB API query failed");
            return result;
        }
        const tpdb_perf_search_content = tpdb_perf_search_response.data;
        // TPDB returns fuzzy matches if actor name does not match
        // Ensure the correct result is selected if user requested an exact match.
        // Else pick the first result that appears in the response.
        let correct_perf_idx = -1;
        if (tpdb_perf_search_content.data.length == 1 && !settings
            .extract_only_if_source_matches_name_exactly) {
            correct_perf_idx = 0;
        }
        if (tpdb_perf_search_content.data.length >= 1 && settings
            .extract_only_if_source_matches_name_exactly) {
            for (let idx = 0; idx < tpdb_perf_search_content.data.length; idx++) {
                const element = tpdb_perf_search_content.data[idx];
                if (element.name === actor_name) {
                    correct_perf_idx = idx;
                    break;
                }
            }
        }
        if (correct_perf_idx == -1) {
            $log("[AMDX] ERR: TPDB Could NOT find correct actor info");
            return result;
        }
        const tpdb_perf_search_data = tpdb_perf_search_content.data[correct_perf_idx];
        // Get initial Bio from search result
        if (tpdb_perf_search_data.bio !== "") {
            result['bio'].add(tpdb_perf_search_data.bio);
        }
        // Get Image and Thumbnail from search result
        result['img_urls'].push(tpdb_perf_search_data.image);
        result['img_urls'].push(tpdb_perf_search_data.thumbnail);
        const tpdb_perf_url = `https://master.metadataapi.net/api/performers/${tpdb_perf_search_data.id}`;
        const tpdb_perf_response = (await $axios.get(tpdb_perf_url, {
            validateStatus: false
        }));
        if (tpdb_perf_response.status != 200 || tpdb_perf_response.data === undefined) {
            $log("[AMDX] ERR: TPDB Direct Actor Information Access Failed");
            return result;
        }
        const perf_data = tpdb_perf_response.data.data;
        if (perf_data === undefined) {
            $log("[AMDX] ERR: TPDB Could NOT read actor information");
            return result;
        }
        // Add actor bio if user requested all bio
        if (perf_data.bio !== "" && settings.get_all_bios) {
            result['bio'].add(perf_data.bio);
        }
        // Add all extra from TPDB to extra_info for Custom Field processing later
        result['extra_info'] = perf_data.extras;
        result['alias_list'] = perf_data.aliases;
        // Ensure duplicate URLs are not added
        // w/ TPDB it's usually the same image everywhere :/
        if (!result['img_urls'].includes(perf_data.image)) {
            result['img_urls'].push(perf_data.image);
        }
        if (!result['img_urls'].includes(perf_data.thumbnail)) {
            result['img_urls'].push(perf_data.thumbnail);
        }
        // Read poster URLs
        perf_data.posters.forEach(element => {
            if (!result['img_urls'].includes(element['url'])) {
                result['img_urls'].push(element['url']);
            }
        });
        // Get all bios and image URLs if requested by user
        if (settings.get_all_bios || settings.get_all_images) {
            perf_data.site_performers.forEach(element => {
                if (settings.get_all_bios && element.bio !== "") {
                    result['bio'].add(element.bio);
                }
                if (settings.get_all_images && !result['img_urls'].includes(element.image)) {
                    result['img_urls'].push(element.image);
                }
                if (settings.get_all_images && !result['img_urls'].includes(element.thumbnail)) {
                    result['img_urls'].push(element.thumbnail);
                }
            });
        }
        $log("[AMDX] MSG: END TPDB Data Extraction");
        return result;
    }

    function get_country_code(ctr_str) {
        var isoCountries = {
            "AFGHANISTAN": "AF",
            "ALAND ISLANDS": "AX",
            "ALBANIA": "AL",
            "ALGERIA": "DZ",
            "AMERICAN SAMOA": "AS",
            "ANDORRA": "AD",
            "ANGOLA": "AO",
            "ANGUILLA": "AI",
            "ANTARCTICA": "AQ",
            "ANTIGUA AND BARBUDA": "AG",
            "ARGENTINA": "AR",
            "ARMENIA": "AM",
            "ARUBA": "AW",
            "AUSTRALIA": "AU",
            "AUSTRIA": "AT",
            "AZERBAIJAN": "AZ",
            "BAHAMAS": "BS",
            "BAHRAIN": "BH",
            "BANGLADESH": "BD",
            "BARBADOS": "BB",
            "BELARUS": "BY",
            "BELGIUM": "BE",
            "BELIZE": "BZ",
            "BENIN": "BJ",
            "BERMUDA": "BM",
            "BHUTAN": "BT",
            "BOLIVIA": "BO",
            "BOSNIA AND HERZEGOVINA": "BA",
            "BOTSWANA": "BW",
            "BOUVET ISLAND": "BV",
            "BRAZIL": "BR",
            "BRITISH INDIAN OCEAN TERRITORY": "IO",
            "BRUNEI DARUSSALAM": "BN",
            "BULGARIA": "BG",
            "BURKINA FASO": "BF",
            "BURUNDI": "BI",
            "CAMBODIA": "KH",
            "CAMEROON": "CM",
            "CANADA": "CA",
            "CAPE VERDE": "CV",
            "CAYMAN ISLANDS": "KY",
            "CENTRAL AFRICAN REPUBLIC": "CF",
            "CHAD": "TD",
            "CHILE": "CL",
            "CHINA": "CN",
            "CHRISTMAS ISLAND": "CX",
            "COCOS (KEELING) ISLANDS": "CC",
            "COLOMBIA": "CO",
            "COMOROS": "KM",
            "CONGO": "CG",
            "CONGO, DEMOCRATIC REPUBLIC": "CD",
            "COOK ISLANDS": "CK",
            "COSTA RICA": "CR",
            "COTE D'IVOIRE": "CI",
            "CROATIA": "HR",
            "CUBA": "CU",
            "CYPRUS": "CY",
            "CZECH REPUBLIC": "CZ",
            "DENMARK": "DK",
            "DJIBOUTI": "DJ",
            "DOMINICA": "DM",
            "DOMINICAN REPUBLIC": "DO",
            "ECUADOR": "EC",
            "EGYPT": "EG",
            "EL SALVADOR": "SV",
            "EQUATORIAL GUINEA": "GQ",
            "ERITREA": "ER",
            "ESTONIA": "EE",
            "ETHIOPIA": "ET",
            "FALKLAND ISLANDS": "FK",
            "FAROE ISLANDS": "FO",
            "FIJI": "FJ",
            "FINLAND": "FI",
            "FRANCE": "FR",
            "FRENCH GUIANA": "GF",
            "FRENCH POLYNESIA": "PF",
            "FRENCH SOUTHERN TERRITORIES": "TF",
            "GABON": "GA",
            "GAMBIA": "GM",
            "GEORGIA": "GE",
            "GERMANY": "DE",
            "GHANA": "GH",
            "GIBRALTAR": "GI",
            "GREECE": "GR",
            "GREENLAND": "GL",
            "GRENADA": "GD",
            "GUADELOUPE": "GP",
            "GUAM": "GU",
            "GUATEMALA": "GT",
            "GUERNSEY": "GG",
            "GUINEA": "GN",
            "GUINEA-BISSAU": "GW",
            "GUYANA": "GY",
            "HAITI": "HT",
            "HEARD ISLAND & MCDONALD ISLANDS": "HM",
            "HOLY SEE (VATICAN CITY STATE)": "VA",
            "HONDURAS": "HN",
            "HONG KONG": "HK",
            "HUNGARY": "HU",
            "ICELAND": "IS",
            "INDIA": "IN",
            "INDONESIA": "ID",
            "IRAN, ISLAMIC REPUBLIC OF": "IR",
            "IRAQ": "IQ",
            "IRELAND": "IE",
            "ISLE OF MAN": "IM",
            "ISRAEL": "IL",
            "ITALY": "IT",
            "JAMAICA": "JM",
            "JAPAN": "JP",
            "JERSEY": "JE",
            "JORDAN": "JO",
            "KAZAKHSTAN": "KZ",
            "KENYA": "KE",
            "KIRIBATI": "KI",
            "REPUBLIC OF KOREA": "KR",
            "SOUTH KOREA": "KR",
            "DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA": "KP",
            "NORTH KOREA": "KP",
            "KUWAIT": "KW",
            "KYRGYZSTAN": "KG",
            "LAO PEOPLE'S DEMOCRATIC REPUBLIC": "LA",
            "LATVIA": "LV",
            "LEBANON": "LB",
            "LESOTHO": "LS",
            "LIBERIA": "LR",
            "LIBYAN ARAB JAMAHIRIYA": "LY",
            "LIECHTENSTEIN": "LI",
            "LITHUANIA": "LT",
            "LUXEMBOURG": "LU",
            "MACAO": "MO",
            "MACEDONIA": "MK",
            "MADAGASCAR": "MG",
            "MALAWI": "MW",
            "MALAYSIA": "MY",
            "MALDIVES": "MV",
            "MALI": "ML",
            "MALTA": "MT",
            "MARSHALL ISLANDS": "MH",
            "MARTINIQUE": "MQ",
            "MAURITANIA": "MR",
            "MAURITIUS": "MU",
            "MAYOTTE": "YT",
            "MEXICO": "MX",
            "MICRONESIA, FEDERATED STATES OF": "FM",
            "MOLDOVA": "MD",
            "MONACO": "MC",
            "MONGOLIA": "MN",
            "MONTENEGRO": "ME",
            "MONTSERRAT": "MS",
            "MOROCCO": "MA",
            "MOZAMBIQUE": "MZ",
            "MYANMAR": "MM",
            "NAMIBIA": "NA",
            "NAURU": "NR",
            "NEPAL": "NP",
            "NETHERLANDS": "NL",
            "NETHERLANDS ANTILLES": "AN",
            "NEW CALEDONIA": "NC",
            "NEW ZEALAND": "NZ",
            "NICARAGUA": "NI",
            "NIGER": "NE",
            "NIGERIA": "NG",
            "NIUE": "NU",
            "NORFOLK ISLAND": "NF",
            "NORTHERN MARIANA ISLANDS": "MP",
            "NORWAY": "NO",
            "OMAN": "OM",
            "PAKISTAN": "PK",
            "PALAU": "PW",
            "PALESTINIAN TERRITORY, OCCUPIED": "PS",
            "PANAMA": "PA",
            "PAPUA NEW GUINEA": "PG",
            "PARAGUAY": "PY",
            "PERU": "PE",
            "PHILIPPINES": "PH",
            "PITCAIRN": "PN",
            "POLAND": "PL",
            "PORTUGAL": "PT",
            "PUERTO RICO": "PR",
            "QATAR": "QA",
            "REUNION": "RE",
            "ROMANIA": "RO",
            "RUSSIAN FEDERATION": "RU",
            "RWANDA": "RW",
            "SAINT BARTHELEMY": "BL",
            "SAINT HELENA": "SH",
            "SAINT KITTS AND NEVIS": "KN",
            "SAINT LUCIA": "LC",
            "SAINT MARTIN": "MF",
            "SAINT PIERRE AND MIQUELON": "PM",
            "SAINT VINCENT AND GRENADINES": "VC",
            "SAMOA": "WS",
            "SAN MARINO": "SM",
            "SAO TOME AND PRINCIPE": "ST",
            "SAUDI ARABIA": "SA",
            "SENEGAL": "SN",
            "SERBIA": "RS",
            "SEYCHELLES": "SC",
            "SIERRA LEONE": "SL",
            "SINGAPORE": "SG",
            "SLOVAKIA": "SK",
            "SLOVENIA": "SI",
            "SOLOMON ISLANDS": "SB",
            "SOMALIA": "SO",
            "SOUTH AFRICA": "ZA",
            "SOUTH GEORGIA AND SANDWICH ISL.": "GS",
            "SPAIN": "ES",
            "SRI LANKA": "LK",
            "SUDAN": "SD",
            "SURINAME": "SR",
            "SVALBARD AND JAN MAYEN": "SJ",
            "SWAZILAND": "SZ",
            "SWEDEN": "SE",
            "SWITZERLAND": "CH",
            "SYRIAN ARAB REPUBLIC": "SY",
            "TAIWAN": "TW",
            "TAJIKISTAN": "TJ",
            "TANZANIA": "TZ",
            "THAILAND": "TH",
            "TIMOR-LESTE": "TL",
            "TOGO": "TG",
            "TOKELAU": "TK",
            "TONGA": "TO",
            "TRINIDAD AND TOBAGO": "TT",
            "TUNISIA": "TN",
            "TURKEY": "TR",
            "TURKMENISTAN": "TM",
            "TURKS AND CAICOS ISLANDS": "TC",
            "TUVALU": "TV",
            "UGANDA": "UG",
            "UKRAINE": "UA",
            "UNITED ARAB EMIRATES": "AE",
            "UNITED KINGDOM": "GB",
            "UNITED STATES": "US",
            "UNITED STATES OUTLYING ISLANDS": "UM",
            "URUGUAY": "UY",
            "UZBEKISTAN": "UZ",
            "VANUATU": "VU",
            "VENEZUELA": "VE",
            "VIETNAM": "VN",
            "VIRGIN ISLANDS, BRITISH": "VG",
            "VIRGIN ISLANDS, U.S.": "VI",
            "WALLIS AND FUTUNA": "WF",
            "WESTERN SAHARA": "EH",
            "YEMEN": "YE",
            "ZAMBIA": "ZM",
            "ZIMBABWE": "ZW"
        };
        const country_string = ctr_str.trim().toUpperCase();
        if (isoCountries.hasOwnProperty(country_string)) {
            return isoCountries[country_string];
        } else {
            return '';
        }
    }
}
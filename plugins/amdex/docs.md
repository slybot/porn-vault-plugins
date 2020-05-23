# [AmDeX] Actor MetaData Extractor v1.6 (2020-MAY-23)

## Most Recent Change
* FEATURE: WikiPorno Added as a new Source
* FEATURE: PornHub Added as a new Source
* FEATURE: Ability to download GIFs from Pornhub
* FEATURE: Ability to get Hero Images (Cover Images) from Pornhub
* FEATURE: Ability to set GIF as image if PornHub Hero Image is not available

## Plugin Details

This "extensible" Actor plugin currently extracts actor information from:
* FreeOnes
    * Date of Birth (See IMPORTANT section below)
    * City of Birth
    * State of Birth
    * Nation of Birth
    * Actor Image
* BabePedia
    * Actor Aliases
    * Actor Images (up to two)
* ThePornDB
    * Actor Bio
    * Actor Aliases
    * Gender
    * BirthPlace
    * Active
    * Astrology
    * Ethnicity
    * Nationality
    * Hair Color
    * Weight (Metric/Imperial)
    * Height (Metric/Imperial)
    * Measurements
    * Cup Size
    * Tattoos
    * Piercings
    * Waist
    * Hips
    * Chest Size
* Wiki Porno
    * Measurements
    * Cup Size
    * Tattoos
    * Piercings
    * Birthplace
    * Weight
    * Height
    * Eye Color
    * Hair Color
    * Ethnicity
    * Astrology
    * Years Active
    * Waist
    * Hips
    * Chest Size
    * Twitter
* PornHub
    * Hero/Cover Image
    * GIFs for Actor (CAN TAKE SEVERAL SECONDS PER GIF)
    * Actor Bio
    * Height
    * Weight
    * Birthplace

This plugin is customizable which allows you to set up AmDeX as you see fit. Some of these configurations are:
* Toggle individual pieces of data extracted if you don't want to store everything.
* Select a source for an image (avatar, thumbnail, alt thumbnail) or date of birth.
* Choose between metric or imperial units for height and weight.
* Set hero image if available.
* Set GIF as a hero image.
* Set GIF as hero image if static banner is not available.
* Use "Field X" from a particular source but "Field Y" from another.




## IMPORTANT

* Set debug to true if you want to see extracted data in the console without saving anything.
* If you are using Linux without a GUI (e.g., Ubuntu Server), then you need to ensure your server's time zone is correctly set.
  * [See instructions here](https://linoxide.com/linux-command/set-time-date-timezone-ubuntu-linux/).
  * Failure to set correct time zone may result in actress birthdates being offset by 1 day.
* Downloading GIFs will slow down the actor creation or metadata extraction process by several seconds per GIF.
* Due to its extensibility, AmDeX requires a massive configuration included as plugin arguments. Please use the initial plugin configuration provided below in your config file.
  * Set individual settings as true/false as desired.
  * To extract a certain custom field (located within custom_field_map for each source), create a custom field within the Porn Manager and add its EXACT NAME next to the field you would like to extract.
    * Leave the field as an empty string if you do not want to extract a certain custom field.

## Extending AmDeX: Contributing to AmDeX

1. Add your source information in the config file under "source_settings"
1. Look through this plugin for comments containing [EXTEND] and add your code there
   1. Create a function that takes two arguments (actorName and settings) to scrape information from your source.
   1. Return a result object from this function.
   1. Set up your function to be called if enabled in the config by adding it to the `tasks` list.
   1. Add final metadata cleanup and setters in the block within `sourced_info.forEach()`
1. Respect user settings
1. ???
1. Profit

## Known Issues
* `use_next_source_on_failure` has not been implemented.
* Not a lot of testing has been done. Report bugs as issues when you come across any.
* Config structure is not validated.
  * Config structure is likely to change so ensure your config is correct with each AmDeX update.
  * For example, `custom_field_map` against each source will soon be moved into a global section to avoid duplication.

## Credits
Thanks @john4valor for help with TPDB and FreeOnes

## Initial Plugin Configuration

Please use the following as your initial plugin configuration and then change settings as desired.

### JSON Format
```json
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
            "set_first_gif_as_hero_img": false,
            "use_gif_as_hero_if_heroimg_not_available": true,
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
```

### YAML Format

```yaml
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
          set_first_gif_as_hero_img: false
          use_gif_as_hero_if_heroimg_not_available: true
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
```
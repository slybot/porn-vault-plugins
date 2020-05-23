## amdex 1.6

by slybot

Actor MetaData EXtraction from multiple sources. See documentation section for more details.

### Documentation

# [AmDeX] Actor MetaData Extractor v1.6 (2020-MAY-23)

## Most Recent Change
* FEATURE: WikiPorno Added as a new Source
* FEATURE: PornHub Added as a new Source
* FEATURE: Ability to download GIFs from Pornhub
* FEATURE: Ability to get Hero Images (Cover Images) from Pornhub
* FEATURE: Ability to set GIF as image if PornHub Hero Image is not available

## Plugin Details

This &quot;extensible&quot; Actor plugin currently extracts actor information from:
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
* Toggle individual pieces of data extracted if you don&#x27;t want to store everything.
* Select a source for an image (avatar, thumbnail, alt thumbnail) or date of birth.
* Choose between metric or imperial units for height and weight.
* Set hero image if available.
* Set GIF as a hero image.
* Set GIF as hero image if static banner is not available.
* Use &quot;Field X&quot; from a particular source but &quot;Field Y&quot; from another.




## IMPORTANT

* Set debug to true if you want to see extracted data in the console without saving anything.
* If you are using Linux without a GUI (e.g., Ubuntu Server), then you need to ensure your server&#x27;s time zone is correctly set.
  * [See instructions here](https://linoxide.com/linux-command/set-time-date-timezone-ubuntu-linux/).
  * Failure to set correct time zone may result in actress birthdates being offset by 1 day.
* Downloading GIFs will slow down the actor creation or metadata extraction process by several seconds per GIF.
* Due to its extensibility, AmDeX requires a massive configuration included as plugin arguments. Please use the initial plugin configuration provided below in your config file.
  * Set individual settings as true/false as desired.
  * To extract a certain custom field (located within custom_field_map for each source), create a custom field within the Porn Manager and add its EXACT NAME next to the field you would like to extract.
    * Leave the field as an empty string if you do not want to extract a certain custom field.

## Extending AmDeX: Contributing to AmDeX

1. Add your source information in the config file under &quot;source_settings&quot;
1. Look through this plugin for comments containing [EXTEND] and add your code there
   1. Create a function that takes two arguments (actorName and settings) to scrape information from your source.
   1. Return a result object from this function.
   1. Set up your function to be called if enabled in the config by adding it to the &#x60;tasks&#x60; list.
   1. Add final metadata cleanup and setters in the block within &#x60;sourced_info.forEach()&#x60;
1. Respect user settings
1. ???
1. Profit

## Known Issues
* &#x60;use_next_source_on_failure&#x60; has not been implemented.
* Not a lot of testing has been done. Report bugs as issues when you come across any.
* Config structure is not validated.
  * Config structure is likely to change so ensure your config is correct with each AmDeX update.
  * For example, &#x60;custom_field_map&#x60; against each source will soon be moved into a global section to avoid duplication.

## Credits
Thanks @john4valor for help with TPDB and FreeOnes

## Initial Plugin Configuration

Please use the following as your initial plugin configuration and then change settings as desired.

### JSON Format
&#x60;&#x60;&#x60;json
&quot;PLUGINS&quot;: {
    &quot;AmDeX&quot;: {
        &quot;path&quot;: &quot;./plugins/amdex.js&quot;,
        &quot;args&quot;: {
            &quot;debug&quot;: false,
            &quot;set_dateofbirth&quot;: true,
            &quot;set_avatar&quot;: true,
            &quot;set_nationality&quot;: true,
            &quot;set_thumbnail&quot;: true,
            &quot;set_alt_thumbnail&quot;: true,
            &quot;set_hero_img&quot;: true,
            &quot;use_thumbnail_as_avatar_if_not_available&quot;: false,
            &quot;set_alias&quot;: true,
            &quot;set_bio&quot;: true,
            &quot;dateofbirth_source&quot;: &quot;freeones&quot;,
            &quot;bio_source&quot;: &quot;pornhub&quot;,
            &quot;avatar_source&quot;: &quot;freeones&quot;,
            &quot;thumbnail_source&quot;: &quot;babepedia&quot;,
            &quot;alt_thumbnail_source&quot;: &quot;babepedia&quot;,
            &quot;hero_img_source&quot;: &quot;pornhub&quot;,
            &quot;set_first_gif_as_hero_img&quot;: false,
            &quot;use_gif_as_hero_if_heroimg_not_available&quot;: true,
            &quot;nationality_source&quot;: &quot;freeones&quot;,
            &quot;use_next_source_on_failure&quot;: false,
            &quot;prefer_metric&quot;: false,
            &quot;source_settings&quot;: {
                &quot;freeones&quot;: {
                    &quot;enabled&quot;: true,
                    &quot;get_aliases&quot;: true,
                    &quot;custom_field_map&quot;: {
                        &quot;birthplace&quot;: &quot;&quot;,
                        &quot;eye_color&quot; : &quot;&quot;,
                        &quot;ethnicity&quot; : &quot;&quot;,
                        &quot;hair_colour&quot; : &quot;&quot;
                    }
                },
                &quot;babepedia&quot;: {
                    &quot;enabled&quot;: true,
                    &quot;get_aliases&quot;: true,
                    &quot;custom_field_map&quot;: {}
                },
                &quot;tpdb&quot;: {
                    &quot;enabled&quot;: true,
                    &quot;extract_only_if_source_matches_name_exactly&quot;: true,
                    &quot;get_performer_bio&quot;: true,
                    &quot;get_all_bios&quot;: false,
                    &quot;get_aliases&quot;: true,
                    &quot;get_all_images&quot;: false,
                    &quot;custom_field_map&quot;: {
                        &quot;gender&quot;: &quot;&quot;,
                        &quot;birthplace&quot;: &quot;&quot;,
                        &quot;active&quot;: &quot;&quot;,
                        &quot;astrology&quot;: &quot;&quot;,
                        &quot;ethnicity&quot;: &quot;&quot;,
                        &quot;hair_colour&quot;: &quot;&quot;,
                        &quot;weight&quot;: &quot;&quot;,
                        &quot;height&quot;: &quot;&quot;,
                        &quot;measurements&quot;: &quot;&quot;,
                        &quot;cupsize&quot;: &quot;&quot;,
                        &quot;tattoos&quot;: &quot;&quot;,
                        &quot;piercings&quot;: &quot;&quot;,
                        &quot;waist&quot;: &quot;&quot;,
                        &quot;hips&quot;: &quot;&quot;,
                        &quot;chest_size&quot;: &quot;&quot;
                    }
                },
                &quot;wikiporno&quot;: {
                    &quot;enabled&quot;: true,
                    &quot;get_aliases&quot;: false,
                    &quot;custom_field_map&quot;: {
                        &quot;measurements&quot;: &quot;&quot;,
                        &quot;cupsize&quot;: &quot;&quot;,
                        &quot;tattoos&quot;: &quot;&quot;,
                        &quot;piercings&quot;: &quot;&quot;,
                        &quot;birthplace&quot;: &quot;&quot;,
                        &quot;weight&quot;: &quot;&quot;,
                        &quot;height&quot;: &quot;&quot;,
                        &quot;eyeColor&quot;: &quot;&quot;,
                        &quot;hairColor&quot;: &quot;&quot;,
                        &quot;ethnicity&quot;: &quot;&quot;,
                        &quot;astrology&quot;: &quot;&quot;,
                        &quot;years_active&quot;: &quot;&quot;,
                        &quot;waist&quot;: &quot;&quot;,
                        &quot;hips&quot;: &quot;&quot;,
                        &quot;chest_size&quot;: &quot;&quot;,
                        &quot;twitter&quot;: &quot;&quot;
                    }
                },
                &quot;pornhub&quot;: {
                    &quot;enabled&quot;: true,
                    &quot;get_gifs&quot;: true,
                    &quot;download_gifs_max_count&quot;: 2,
                    &quot;custom_field_map&quot;: {
                        &quot;birthplace&quot;: &quot;&quot;,
                        &quot;height&quot;: &quot;&quot;,
                        &quot;weight&quot;: &quot;&quot;
                    }
                }
            }
        }
    }
},
&quot;PLUGIN_EVENTS&quot;: {
    &quot;actorCreated&quot;: [
        &quot;AmDeX&quot;
    ],
    &quot;actorCustom&quot;: [
        &quot;AmDeX&quot;
    ]
}
&#x60;&#x60;&#x60;

### YAML Format

&#x60;&#x60;&#x60;yaml
    ---
    PLUGINS:
      AmDeX:
        path: &quot;./plugins/amdex.js&quot;
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
                birthplace: &#x27;&#x27;
                eye_color: &#x27;&#x27;
                ethnicity: &#x27;&#x27;
                hair_colour: &#x27;&#x27;
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
                gender: &#x27;&#x27;
                birthplace: &#x27;&#x27;
                active: &#x27;&#x27;
                astrology: &#x27;&#x27;
                ethnicity: &#x27;&#x27;
                hair_colour: &#x27;&#x27;
                weight: &#x27;&#x27;
                height: &#x27;&#x27;
                measurements: &#x27;&#x27;
                cupsize: &#x27;&#x27;
                tattoos: &#x27;&#x27;
                piercings: &#x27;&#x27;
                waist: &#x27;&#x27;
                hips: &#x27;&#x27;
                chest_size: &#x27;&#x27;
            wikiporno:
                enabled: true
                get_aliases: false
                custom_field_map:
                    measurements: &#x27;&#x27;
                    cupsize: &#x27;&#x27;
                    tattoos&quot;: &#x27;&#x27;
                    piercings: &#x27;&#x27;
                    birthplace: &#x27;&#x27;
                    weight: &#x27;&#x27;
                    height: &#x27;&#x27;
                    eyeColor: &#x27;&#x27;
                    hairColor: &#x27;&#x27;
                    ethnicity: &#x27;&#x27;
                    astrology: &#x27;&#x27;
                    years_active: &#x27;&#x27;
                    waist: &#x27;&#x27;
                    hips: &#x27;&#x27;
                    chest_size: &#x27;&#x27;
                    twitter: &#x27;&#x27;
            pornhub:
                enabled: true
                get_gifs: true
                download_gifs_max_count: 2
                custom_field_map:
                    birthplace: &#x27;&#x27;
                    height: &#x27;&#x27;
                    weight: &#x27;&#x27;

      PLUGIN_EVENTS:
        actorCreated:
            - AmDeX
        actorCustom:
            - AmDeX
&#x60;&#x60;&#x60;
### Arguments

| Name                                                             | Type    | Required | Description                                                                                                 |
| ---------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| debug                                                            | Boolean | true     | DEBUG Mode. Outputs all extracted data on console without saving the data against the actor (except images) |
| set_dateofbirth                                                  | Boolean | true     | Extract and set Date of Birth                                                                               |
| set_avatar                                                       | Boolean | true     | Extract and set Avatar Image                                                                                |
| set_nationality                                                  | Boolean | true     | Extract and set Nationality information (displayed as a flag in UI)                                         |
| set_thumbnail                                                    | Boolean | true     | Extract and set actor thumbnail                                                                             |
| set_alt_thumbnail                                                | Boolean | true     | Extract and set alternate thumbnail image for actor                                                         |
| set_hero_img                                                     | Boolean | true     | Extract and set cover image as a banner in the actor UI                                                     |
| set_first_gif_as_hero_img                                        | Boolean | true     | Extract and set a GIF as the hero cover banner                                                              |
| use_gif_as_hero_if_heroimg_not_available                         | Boolean | true     | Extract and set GIF as the hero cover banner ONLY IF static banner image is not available                   |
| use_thumbnail_as_avatar_if_not_available                         | Boolean | true     | Extract and set thumbnail as avatar image if avatar image is not available                                  |
| set_alias                                                        | Boolean | true     | Extract and set Actor Aliases                                                                               |
| set_bio                                                          | Boolean | true     | Extract and set Actor Biography                                                                             |
| dateofbirth_source                                               | Boolean | true     | Preferred Source for Date of Birth Information                                                              |
| bio_source                                                       | Boolean | true     | Preferred Source for Actor Bio                                                                              |
| avatar_source                                                    | Boolean | true     | Preferred Source for Actor Avatar Image                                                                     |
| thumbnail_source                                                 | Boolean | true     | Preferred Source for Actor thumbnail                                                                        |
| alt_thumbnail_source                                             | Boolean | true     | Preferred Source for Actor alternate thumbnail                                                              |
| hero_img_source                                                  | Boolean | true     | Preferred Source for Actor Hero Cover Banner Image                                                          |
| nationality_source                                               | Boolean | true     | Preferred Source for Actor Nationality                                                                      |
| use_next_source_on_failure                                       | Boolean | true     | Use data from another source if not available from preferred source. (NOT IMPLEMENTED)                      |
| prefer_metric                                                    | Boolean | true     | Set Height and Weight Units in Metric if set to true.                                                       |
| source_settings                                                  | Dict    | true     | Source-specific settings                                                                                    |
| source_settings.freeones                                         | Dict    | true     | FreeOnes-specific settings                                                                                  |
| source_settings.freeones.enabled                                 | Boolean | true     | Toggle FreeOnes as a Source                                                                                 |
| source_settings.freeones.get_aliases                             | Boolean | true     | Get Aliases from FreeOnes                                                                                   |
| source_settings.freeones.custom_field_map                        | Dict    | true     | Custom Fields available from FreeOnes                                                                       |
| source_settings.freeones.custom_field_map.birthplace             | String  | true     | Field Mapping for Birthplace                                                                                |
| source_settings.freeones.custom_field_map.eye_color              | String  | true     | Field Mapping for Eye Color                                                                                 |
| source_settings.freeones.custom_field_map.ethnicity              | String  | true     | Field Mapping for Ethnicity                                                                                 |
| source_settings.freeones.custom_field_map.hair_colour            | String  | true     | Field Mapping for Hair Color                                                                                |
| source_settings.babepedia                                        | Dict    | true     |                                                                                                             |
| source_settings.babepedia.enabled                                | Boolean | true     | Extracts Information from BabePedia if set                                                                  |
| source_settings.babepedia.get_aliases                            | Boolean | true     | Extracts Aliases if set                                                                                     |
| source_settings.babepedia.custom_field_map                       | Dict    | true     | Custom Field Mappings for BabePedia                                                                         |
| source_settings.tpdb                                             | Dict    | true     | TPDB-specific settings                                                                                      |
| source_settings.tpdb.enabled                                     | Boolean | true     | Extracts Information from TPDB if set                                                                       |
| source_settings.tpdb.extract_only_if_source_matches_name_exactly | Boolean | true     | Extracts information from TPDB ONLY if result matches actor name exactly.                                   |
| source_settings.tpdb.get_performer_bio                           | Boolean | true     | Extracts Actor bio if set                                                                                   |
| source_settings.tpdb.get_all_bios                                | Boolean | true     | Extracts ALL actor Bios from TPDB and concatenates them into one                                            |
| source_settings.tpdb.get_aliases                                 | Boolean | true     | Extracts Actor Aliases if set                                                                               |
| source_settings.tpdb.get_all_images                              | Boolean | true     | Downloads ALL images from TPDB if set                                                                       |
| source_settings.tpdb.custom_field_map                            | Dict    | true     | Custom field mappings for TPDB                                                                              |
| source_settings.tpdb.custom_field_map.gender                     | String  | true     | Field Mapping for Gender                                                                                    |
| source_settings.tpdb.custom_field_map.birthplace                 | String  | true     | Field Mapping for Birthplace                                                                                |
| source_settings.tpdb.custom_field_map.active                     | String  | true     | Field Mapping for whether Actor is currently Active or not                                                  |
| source_settings.tpdb.custom_field_map.astrology                  | String  | true     | Field Mapping for Astrological Sign                                                                         |
| source_settings.tpdb.custom_field_map.ethnicity                  | String  | true     | Field Mapping for Ethnicity                                                                                 |
| source_settings.tpdb.custom_field_map.hair_colour                | String  | true     | Field Mapping for Hair Color                                                                                |
| source_settings.tpdb.custom_field_map.weight                     | String  | true     | Field Mapping for Weight                                                                                    |
| source_settings.tpdb.custom_field_map.height                     | String  | true     | Field Mapping for Height                                                                                    |
| source_settings.tpdb.custom_field_map.measurements               | String  | true     | Field Mapping for Measurements                                                                              |
| source_settings.tpdb.custom_field_map.cupsize                    | String  | true     | Field Mapping for Cup Size                                                                                  |
| source_settings.tpdb.custom_field_map.tattoos                    | String  | true     | Field Mapping for Tattoos                                                                                   |
| source_settings.tpdb.custom_field_map.piercings                  | String  | true     | Field Mapping for Piercings                                                                                 |
| source_settings.tpdb.custom_field_map.waist                      | String  | true     | Field Mapping for Waist                                                                                     |
| source_settings.tpdb.custom_field_map.hips                       | String  | true     | Field Mapping for Hips                                                                                      |
| source_settings.tpdb.custom_field_map.chest_size                 | String  | true     | Field Mapping for Chest Size                                                                                |
| source_settings.wikiporno                                        | Dict    | true     | Wikiporno-specific Settings                                                                                 |
| source_settings.wikiporno.enabled                                | Boolean | true     | Extracts information from WikiPorno if set                                                                  |
| source_settings.wikiporno.get_aliases                            | Boolean | true     | Extracts Aliases from WikiPorno if set                                                                      |
| source_settings.wikiporno.custom_field_map                       | Dict    | true     | Custom Field Mapping for WikiPorno                                                                          |
| source_settings.wikiporno.custom_field_map.measurements          | String  | true     | Field Mapping for Measurements                                                                              |
| source_settings.wikiporno.custom_field_map.cupsize               | String  | true     | Field Mapping for Cup Size                                                                                  |
| source_settings.wikiporno.custom_field_map.tattoos               | String  | true     | Field Mapping for Tattoos                                                                                   |
| source_settings.wikiporno.custom_field_map.piercings             | String  | true     | Field Mapping for Piercings                                                                                 |
| source_settings.wikiporno.custom_field_map.birthplace            | String  | true     | Field Mapping for Birthplace                                                                                |
| source_settings.wikiporno.custom_field_map.weight                | String  | true     | Field Mapping for Weight                                                                                    |
| source_settings.wikiporno.custom_field_map.height                | String  | true     | Field Mapping for Height                                                                                    |
| source_settings.wikiporno.custom_field_map.eyeColor              | String  | true     | Field Mapping for Eye Color                                                                                 |
| source_settings.wikiporno.custom_field_map.hairColor             | String  | true     | Field Mapping for Hair Color                                                                                |
| source_settings.wikiporno.custom_field_map.ethnicity             | String  | true     | Field Mapping for Ethnicity                                                                                 |
| source_settings.wikiporno.custom_field_map.astrology             | String  | true     | Field Mapping for Astrological Sign                                                                         |
| source_settings.wikiporno.custom_field_map.years_active          | String  | true     | Field Mapping for Years Active in the industry                                                              |
| source_settings.wikiporno.custom_field_map.waist                 | String  | true     | Field Mapping for Waist                                                                                     |
| source_settings.wikiporno.custom_field_map.hips                  | String  | true     | Field Mapping for Hips                                                                                      |
| source_settings.wikiporno.custom_field_map.chest_size            | String  | true     | Field Mapping for Chest Size                                                                                |
| source_settings.wikiporno.custom_field_map.twitter               | String  | true     | Field Mapping for Twitter Account                                                                           |
| source_settings.pornhub                                          | Dict    | true     | PornHub-specific settings                                                                                   |
| source_settings.pornhub.enabled                                  | Boolean | true     | Extracts information from PornHub if set                                                                    |
| source_settings.pornhub.get_gifs                                 | Boolean | true     | Extracts GIFs from PornHub if set                                                                           |
| source_settings.pornhub.download_gifs_max_count                  | Integer | true     | Total GIFs to download for actor from PornHub                                                               |
| source_settings.pornhub.custom_field_map                         | Dict    | true     | Custom Field Mappings for PornHub                                                                           |
| source_settings.pornhub.custom_field_map.birthplace              | String  | true     | Field Mapping for Birthplace                                                                                |
| source_settings.pornhub.custom_field_map.height                  | String  | true     | Field Mapping for Height                                                                                    |
| source_settings.pornhub.custom_field_map.weight                  | String  | true     | Field Mapping for Weight                                                                                    |
### Example installation

```json
{
  "PLUGINS": {
    "AmDeX": {
      "path": "./plugins/AmDeX/main.js",
      "args": {}
    }
  }
}
```

```yaml
---
PLUGINS:
  "AmDeX":
    path: "./plugins/AmDeX/main.js"
    args: {}
```

// Generated directly from TIDAS JSON Schema: tidas_processes_category.json
import { z } from 'zod';
import { jsonSchemaOneOf } from './../core/validation/json-schema';

export const ProcessesCategorySchema: z.ZodType<any> = jsonSchemaOneOf(
  [
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('A').optional(),
      '#text': z.literal('Agriculture, forestry and fishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('01').optional(),
      '#text': z
        .literal(
          'Crop and animal production, hunting and related service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('011').optional(),
      '#text': z.literal('Growing of non-perennial crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0111').optional(),
      '#text': z
        .literal(
          'Growing of cereals (except rice), leguminous crops and oil seeds',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0112').optional(),
      '#text': z.literal('Growing of rice').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0113').optional(),
      '#text': z
        .literal('Growing of vegetables and melons, roots and tubers')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0114').optional(),
      '#text': z.literal('Growing of sugar cane').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0115').optional(),
      '#text': z.literal('Growing of tobacco').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0116').optional(),
      '#text': z.literal('Growing of fibre crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0119').optional(),
      '#text': z.literal('Growing of other non-perennial crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('012').optional(),
      '#text': z.literal('Growing of perennial crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0121').optional(),
      '#text': z.literal('Growing of grapes').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0122').optional(),
      '#text': z
        .literal('Growing of tropical and subtropical fruits')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0123').optional(),
      '#text': z.literal('Growing of citrus fruits').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0124').optional(),
      '#text': z.literal('Growing of pome fruits and stone fruits').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0125').optional(),
      '#text': z
        .literal('Growing of other tree and bush fruits and nuts')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0126').optional(),
      '#text': z.literal('Growing of oleaginous fruits').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0127').optional(),
      '#text': z.literal('Growing of beverage crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0128').optional(),
      '#text': z
        .literal('Growing of spices, aromatic, drug and pharmaceutical crops')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0129').optional(),
      '#text': z.literal('Growing of other perennial crops').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('013').optional(),
      '#text': z.literal('Plant propagation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0130').optional(),
      '#text': z.literal('Plant propagation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('014').optional(),
      '#text': z.literal('Animal production').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0141').optional(),
      '#text': z.literal('Raising of cattle and buffaloes').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0142').optional(),
      '#text': z.literal('Raising of horses and other equines').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0143').optional(),
      '#text': z.literal('Raising of camels and camelids').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0144').optional(),
      '#text': z.literal('Raising of sheep and goats').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0145').optional(),
      '#text': z.literal('Raising of swine and pigs').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0146').optional(),
      '#text': z.literal('Raising of poultry').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0149').optional(),
      '#text': z.literal('Raising of other animals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('015').optional(),
      '#text': z.literal('Mixed farming').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0150').optional(),
      '#text': z.literal('Mixed farming').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('016').optional(),
      '#text': z
        .literal(
          'Support activities to agriculture and post-harvest crop activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0161').optional(),
      '#text': z.literal('Support activities for crop production').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0162').optional(),
      '#text': z.literal('Support activities for animal production').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0163').optional(),
      '#text': z.literal('Post-harvest crop activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0164').optional(),
      '#text': z.literal('Seed processing for propagation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('017').optional(),
      '#text': z
        .literal('Hunting, trapping and related service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0170').optional(),
      '#text': z
        .literal('Hunting, trapping and related service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('02').optional(),
      '#text': z.literal('Forestry and logging').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('021').optional(),
      '#text': z
        .literal('Silviculture and other forestry activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0210').optional(),
      '#text': z
        .literal('Silviculture and other forestry activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('022').optional(),
      '#text': z.literal('Logging').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0220').optional(),
      '#text': z.literal('Logging').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('023').optional(),
      '#text': z.literal('Gathering of non-wood forest products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0230').optional(),
      '#text': z.literal('Gathering of non-wood forest products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('024').optional(),
      '#text': z.literal('Support services to forestry').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0240').optional(),
      '#text': z.literal('Support services to forestry').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('03').optional(),
      '#text': z.literal('Fishing and aquaculture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('031').optional(),
      '#text': z.literal('Fishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0311').optional(),
      '#text': z.literal('Marine fishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0312').optional(),
      '#text': z.literal('Freshwater fishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('032').optional(),
      '#text': z.literal('Aquaculture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0321').optional(),
      '#text': z.literal('Marine aquaculture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0322').optional(),
      '#text': z.literal('Freshwater aquaculture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('033').optional(),
      '#text': z
        .literal('Support activities for fishing and aquaculture')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0330').optional(),
      '#text': z
        .literal('Support activities for fishing and aquaculture')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('B').optional(),
      '#text': z.literal('Mining and quarrying').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('05').optional(),
      '#text': z.literal('Mining of coal and lignite').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('051').optional(),
      '#text': z.literal('Mining of hard coal').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0510').optional(),
      '#text': z.literal('Mining of hard coal').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('052').optional(),
      '#text': z.literal('Mining of lignite').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0520').optional(),
      '#text': z.literal('Mining of lignite').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('06').optional(),
      '#text': z
        .literal('Extraction of crude petroleum and natural gas')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('061').optional(),
      '#text': z.literal('Extraction of crude petroleum').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0610').optional(),
      '#text': z.literal('Extraction of crude petroleum').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('062').optional(),
      '#text': z.literal('Extraction of natural gas').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0620').optional(),
      '#text': z.literal('Extraction of natural gas').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('07').optional(),
      '#text': z.literal('Mining of metal ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('071').optional(),
      '#text': z.literal('Mining of iron ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0710').optional(),
      '#text': z.literal('Mining of iron ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('072').optional(),
      '#text': z.literal('Mining of non-ferrous metal ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0721').optional(),
      '#text': z.literal('Mining of uranium and thorium ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0729').optional(),
      '#text': z.literal('Mining of other non-ferrous metal ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('08').optional(),
      '#text': z.literal('Other mining and quarrying').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('081').optional(),
      '#text': z.literal('Quarrying of stone, sand and clay').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0810').optional(),
      '#text': z.literal('Quarrying of stone, sand and clay').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('089').optional(),
      '#text': z.literal('Mining and quarrying n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0891').optional(),
      '#text': z
        .literal('Mining of chemical and fertilizer minerals')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0892').optional(),
      '#text': z.literal('Extraction of peat').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0893').optional(),
      '#text': z.literal('Extraction of salt').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0899').optional(),
      '#text': z.literal('Other mining and quarrying n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('09').optional(),
      '#text': z.literal('Mining support service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('091').optional(),
      '#text': z
        .literal('Support activities for petroleum and natural gas extraction')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0910').optional(),
      '#text': z
        .literal('Support activities for petroleum and natural gas extraction')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('099').optional(),
      '#text': z
        .literal('Support activities for other mining and quarrying')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('0990').optional(),
      '#text': z
        .literal('Support activities for other mining and quarrying')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('C').optional(),
      '#text': z.literal('Manufacturing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('10').optional(),
      '#text': z.literal('Manufacture of food products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('101').optional(),
      '#text': z.literal('Processing and preserving of meat').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1010').optional(),
      '#text': z.literal('Processing and preserving of meat').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('102').optional(),
      '#text': z
        .literal('Processing and preserving of fish, crustaceans and molluscs')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1020').optional(),
      '#text': z
        .literal('Processing and preserving of fish, crustaceans and molluscs')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('103').optional(),
      '#text': z
        .literal('Processing and preserving of fruit and vegetables')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1030').optional(),
      '#text': z
        .literal('Processing and preserving of fruit and vegetables')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('104').optional(),
      '#text': z
        .literal('Manufacture of vegetable and animal oils and fats')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1040').optional(),
      '#text': z
        .literal('Manufacture of vegetable and animal oils and fats')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('105').optional(),
      '#text': z.literal('Manufacture of dairy products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1050').optional(),
      '#text': z.literal('Manufacture of dairy products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('106').optional(),
      '#text': z
        .literal(
          'Manufacture of grain mill products, starches and starch products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1061').optional(),
      '#text': z.literal('Manufacture of grain mill products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1062').optional(),
      '#text': z
        .literal('Manufacture of starches and starch products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('107').optional(),
      '#text': z.literal('Manufacture of other food products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1071').optional(),
      '#text': z.literal('Manufacture of bakery products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1072').optional(),
      '#text': z.literal('Manufacture of sugar').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1073').optional(),
      '#text': z
        .literal('Manufacture of cocoa, chocolate and sugar confectionery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1074').optional(),
      '#text': z
        .literal(
          'Manufacture of macaroni, noodles, couscous and similar farinaceous products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1075').optional(),
      '#text': z.literal('Manufacture of prepared meals and dishes').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1076').optional(),
      '#text': z.literal('Processing of coffee and tea').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1079').optional(),
      '#text': z
        .literal('Manufacture of other food products n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('108').optional(),
      '#text': z.literal('Manufacture of prepared animal feeds').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1080').optional(),
      '#text': z.literal('Manufacture of prepared animal feeds').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('11').optional(),
      '#text': z.literal('Manufacture of beverages').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('110').optional(),
      '#text': z.literal('Manufacture of beverages').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1101').optional(),
      '#text': z
        .literal('Distilling, rectifying and blending of spirits')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1102').optional(),
      '#text': z.literal('Manufacture of wines').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1103').optional(),
      '#text': z.literal('Manufacture of beer').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1104').optional(),
      '#text': z.literal('Manufacture of malt').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1105').optional(),
      '#text': z
        .literal(
          'Manufacture of soft drinks; production of mineral waters and other bottled waters',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('12').optional(),
      '#text': z.literal('Manufacture of tobacco products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('120').optional(),
      '#text': z.literal('Manufacture of tobacco products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1200').optional(),
      '#text': z.literal('Manufacture of tobacco products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('13').optional(),
      '#text': z.literal('Manufacture of textiles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('131').optional(),
      '#text': z
        .literal('Spinning, weaving and finishing of textiles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1311').optional(),
      '#text': z
        .literal('Preparation and spinning of textile fibres')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1312').optional(),
      '#text': z.literal('Weaving of textiles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1313').optional(),
      '#text': z.literal('Finishing of textiles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('139').optional(),
      '#text': z.literal('Manufacture of other textiles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1391').optional(),
      '#text': z
        .literal('Manufacture of knitted and crocheted fabrics')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1392').optional(),
      '#text': z
        .literal('Manufacture of made-up textile articles, except apparel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1393').optional(),
      '#text': z.literal('Manufacture of carpets and rugs').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1394').optional(),
      '#text': z
        .literal('Manufacture of cordage, rope, twine and netting')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1399').optional(),
      '#text': z.literal('Manufacture of other textiles n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('14').optional(),
      '#text': z.literal('Manufacture of wearing apparel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('141').optional(),
      '#text': z
        .literal('Manufacture of wearing apparel, except fur apparel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1410').optional(),
      '#text': z
        .literal('Manufacture of wearing apparel, except fur apparel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('142').optional(),
      '#text': z.literal('Manufacture of articles of fur').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1420').optional(),
      '#text': z.literal('Manufacture of articles of fur').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('143').optional(),
      '#text': z
        .literal('Manufacture of knitted and crocheted apparel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1430').optional(),
      '#text': z
        .literal('Manufacture of knitted and crocheted apparel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('15').optional(),
      '#text': z
        .literal('Manufacture of leather and related products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('151').optional(),
      '#text': z
        .literal(
          'Tanning, dyeing, dressing of leather and fur; manufacture of luggage, handbags, saddlery and harness',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1511').optional(),
      '#text': z
        .literal('Tanning and dressing of leather; dressing and dyeing of fur')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1512').optional(),
      '#text': z
        .literal(
          'Manufacture of luggage, handbags and the like, saddlery and harness of any material',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('152').optional(),
      '#text': z.literal('Manufacture of footwear').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1520').optional(),
      '#text': z.literal('Manufacture of footwear').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('16').optional(),
      '#text': z
        .literal(
          'Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('161').optional(),
      '#text': z.literal('Sawmilling and planing of wood').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1610').optional(),
      '#text': z.literal('Sawmilling and planing of wood').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('162').optional(),
      '#text': z
        .literal(
          'Manufacture of products of wood, cork, straw and plaiting materials',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1621').optional(),
      '#text': z
        .literal('Manufacture of veneer sheets and wood-based panels')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1622').optional(),
      '#text': z
        .literal("Manufacture of builders' carpentry and joinery")
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1623').optional(),
      '#text': z.literal('Manufacture of wooden containers').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1629').optional(),
      '#text': z
        .literal(
          'Manufacture of other products of wood; manufacture of articles of cork, straw and plaiting materials',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('17').optional(),
      '#text': z.literal('Manufacture of paper and paper products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('170').optional(),
      '#text': z.literal('Manufacture of paper and paper products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1701').optional(),
      '#text': z
        .literal('Manufacture of pulp, paper and paperboard')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1702').optional(),
      '#text': z
        .literal(
          'Manufacture of corrugated paper and paperboard and of containers of paper and paperboard',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1709').optional(),
      '#text': z
        .literal('Manufacture of other articles of paper and paperboard')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('18').optional(),
      '#text': z
        .literal('Printing and reproduction of recorded media')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('181').optional(),
      '#text': z
        .literal('Printing and service activities related to printing')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1811').optional(),
      '#text': z.literal('Printing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1812').optional(),
      '#text': z.literal('Service activities related to printing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('182').optional(),
      '#text': z.literal('Reproduction of recorded media').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1820').optional(),
      '#text': z.literal('Reproduction of recorded media').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('19').optional(),
      '#text': z
        .literal('Manufacture of coke and refined petroleum products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('191').optional(),
      '#text': z.literal('Manufacture of coke oven products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1910').optional(),
      '#text': z.literal('Manufacture of coke oven products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('192').optional(),
      '#text': z
        .literal(
          'Manufacture of refined petroleum products; manufacture of fossil fuel products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('1920').optional(),
      '#text': z
        .literal(
          'Manufacture of refined petroleum products; manufacture of fossil fuel products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('20').optional(),
      '#text': z
        .literal('Manufacture of chemicals and chemical products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('201').optional(),
      '#text': z
        .literal(
          'Manufacture of basic chemicals, fertilizers and nitrogen compounds, plastics and synthetic rubber in primary forms',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2011').optional(),
      '#text': z.literal('Manufacture of basic chemicals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2012').optional(),
      '#text': z
        .literal('Manufacture of fertilizers and nitrogen compounds')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2013').optional(),
      '#text': z
        .literal(
          'Manufacture of plastics and synthetic rubber in primary forms',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('202').optional(),
      '#text': z.literal('Manufacture of other chemical products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2021').optional(),
      '#text': z
        .literal('Manufacture of pesticides and other agrochemical products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2022').optional(),
      '#text': z
        .literal(
          'Manufacture of paints, varnishes and similar coatings, printing ink and mastics',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2023').optional(),
      '#text': z
        .literal(
          'Manufacture of soap and detergents, cleaning and polishing preparations, perfumes and toilet preparations',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2029').optional(),
      '#text': z
        .literal('Manufacture of other chemical products n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('203').optional(),
      '#text': z.literal('Manufacture of man-made fibres').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2030').optional(),
      '#text': z.literal('Manufacture of man-made fibres').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('21').optional(),
      '#text': z
        .literal(
          'Manufacture of basic pharmaceutical products and pharmaceutical preparations',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('210').optional(),
      '#text': z
        .literal(
          'Manufacture of pharmaceuticals, medicinal chemical and botanical products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2100').optional(),
      '#text': z
        .literal(
          'Manufacture of pharmaceuticals, medicinal chemical and botanical products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('22').optional(),
      '#text': z
        .literal('Manufacture of rubber and plastic products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('221').optional(),
      '#text': z.literal('Manufacture of rubber products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2211').optional(),
      '#text': z
        .literal(
          'Manufacture of rubber tyres and tubes; retreading and rebuilding of rubber tyres',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2219').optional(),
      '#text': z.literal('Manufacture of other rubber products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('222').optional(),
      '#text': z.literal('Manufacture of plastics products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2220').optional(),
      '#text': z.literal('Manufacture of plastics products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('23').optional(),
      '#text': z
        .literal('Manufacture of other non-metallic mineral products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('231').optional(),
      '#text': z.literal('Manufacture of glass and glass products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2310').optional(),
      '#text': z.literal('Manufacture of glass and glass products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('239').optional(),
      '#text': z
        .literal('Manufacture of non-metallic mineral products n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2391').optional(),
      '#text': z.literal('Manufacture of refractory products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2392').optional(),
      '#text': z.literal('Manufacture of clay building materials').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2393').optional(),
      '#text': z
        .literal('Manufacture of other porcelain and ceramic products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2394').optional(),
      '#text': z.literal('Manufacture of cement, lime and plaster').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2395').optional(),
      '#text': z
        .literal('Manufacture of articles of concrete, cement and plaster')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2396').optional(),
      '#text': z.literal('Cutting, shaping and finishing of stone').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2399').optional(),
      '#text': z
        .literal('Manufacture of other non-metallic mineral products n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('24').optional(),
      '#text': z.literal('Manufacture of basic metals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('241').optional(),
      '#text': z.literal('Manufacture of basic iron and steel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2410').optional(),
      '#text': z.literal('Manufacture of basic iron and steel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('242').optional(),
      '#text': z
        .literal('Manufacture of basic precious and other non-ferrous metals')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2420').optional(),
      '#text': z
        .literal('Manufacture of basic precious and other non-ferrous metals')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('243').optional(),
      '#text': z.literal('Casting of metals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2431').optional(),
      '#text': z.literal('Casting of iron and steel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2432').optional(),
      '#text': z.literal('Casting of non-ferrous metals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('25').optional(),
      '#text': z
        .literal(
          'Manufacture of fabricated metal products, except machinery and equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('251').optional(),
      '#text': z
        .literal(
          'Manufacture of structural metal products, tanks, reservoirs and steam generators',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2511').optional(),
      '#text': z.literal('Manufacture of structural metal products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2512').optional(),
      '#text': z
        .literal('Manufacture of tanks, reservoirs and containers of metal')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2513').optional(),
      '#text': z
        .literal(
          'Manufacture of steam generators, except central heating hot water boilers',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('252').optional(),
      '#text': z.literal('Manufacture of weapons and ammunition').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2520').optional(),
      '#text': z.literal('Manufacture of weapons and ammunition').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('259').optional(),
      '#text': z
        .literal(
          'Manufacture of other fabricated metal products; metalworking service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2591').optional(),
      '#text': z
        .literal(
          'Forging, pressing, stamping and roll-forming of metal; powder metallurgy',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2592').optional(),
      '#text': z
        .literal('Treatment and coating of metals; machining')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2593').optional(),
      '#text': z
        .literal('Manufacture of cutlery, hand tools and general hardware')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2599').optional(),
      '#text': z
        .literal('Manufacture of other fabricated metal products n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('26').optional(),
      '#text': z
        .literal('Manufacture of computer, electronic and optical products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('261').optional(),
      '#text': z
        .literal('Manufacture of electronic components and boards')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2611').optional(),
      '#text': z
        .literal(
          'Manufacture of solar cells, solar panels and photovoltaic inverters',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2619').optional(),
      '#text': z
        .literal('Manufacture of other electronic components and boards')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('262').optional(),
      '#text': z
        .literal('Manufacture of computers and peripheral equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2620').optional(),
      '#text': z
        .literal('Manufacture of computers and peripheral equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('263').optional(),
      '#text': z.literal('Manufacture of communication equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2630').optional(),
      '#text': z.literal('Manufacture of communication equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('264').optional(),
      '#text': z.literal('Manufacture of consumer electronics').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2640').optional(),
      '#text': z.literal('Manufacture of consumer electronics').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('265').optional(),
      '#text': z
        .literal(
          'Manufacture of measuring, testing, navigating and control equipment; watches and clocks',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2651').optional(),
      '#text': z
        .literal(
          'Manufacture of measuring, testing, navigating and control equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2652').optional(),
      '#text': z.literal('Manufacture of watches and clocks').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('266').optional(),
      '#text': z
        .literal(
          'Manufacture of irradiation, electromedical and electrotherapeutic equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2660').optional(),
      '#text': z
        .literal(
          'Manufacture of irradiation, electromedical and electrotherapeutic equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('267').optional(),
      '#text': z
        .literal(
          'Manufacture of optical instruments and photographic equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2670').optional(),
      '#text': z
        .literal(
          'Manufacture of optical instruments and photographic equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('268').optional(),
      '#text': z
        .literal('Manufacture of magnetic and optical media')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2680').optional(),
      '#text': z
        .literal('Manufacture of magnetic and optical media')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('27').optional(),
      '#text': z.literal('Manufacture of electrical equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('271').optional(),
      '#text': z
        .literal(
          'Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2710').optional(),
      '#text': z
        .literal(
          'Manufacture of electric motors, generators, transformers and electricity distribution and control apparatus',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('272').optional(),
      '#text': z
        .literal('Manufacture of batteries and accumulators')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2720').optional(),
      '#text': z
        .literal('Manufacture of batteries and accumulators')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('273').optional(),
      '#text': z.literal('Manufacture of wiring and wiring devices').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2731').optional(),
      '#text': z.literal('Manufacture of fibre optic cables').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2732').optional(),
      '#text': z
        .literal(
          'Manufacture of other electronic and electric wires and cables',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2733').optional(),
      '#text': z.literal('Manufacture of wiring devices').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('274').optional(),
      '#text': z.literal('Manufacture of lighting equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2740').optional(),
      '#text': z.literal('Manufacture of lighting equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('275').optional(),
      '#text': z.literal('Manufacture of domestic appliances').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2750').optional(),
      '#text': z.literal('Manufacture of domestic appliances').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('279').optional(),
      '#text': z
        .literal('Manufacture of other electrical equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2790').optional(),
      '#text': z
        .literal('Manufacture of other electrical equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('28').optional(),
      '#text': z
        .literal('Manufacture of machinery and equipment n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('281').optional(),
      '#text': z.literal('Manufacture of general-purpose machinery').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2811').optional(),
      '#text': z
        .literal(
          'Manufacture of engines and turbines, except aircraft, vehicle and cycle engines',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2812').optional(),
      '#text': z.literal('Manufacture of fluid power equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2813').optional(),
      '#text': z
        .literal('Manufacture of other pumps, compressors, taps and valves')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2814').optional(),
      '#text': z
        .literal('Manufacture of bearings, gears, gearing and driving elements')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2815').optional(),
      '#text': z
        .literal(
          'Manufacture of ovens, furnaces and permanent household heating equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2816').optional(),
      '#text': z
        .literal('Manufacture of lifting and handling equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2817').optional(),
      '#text': z
        .literal(
          'Manufacture of office machinery and equipment (except computers and peripheral equipment)',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2818').optional(),
      '#text': z.literal('Manufacture of power-driven hand tools').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2819').optional(),
      '#text': z
        .literal('Manufacture of other general-purpose machinery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('282').optional(),
      '#text': z.literal('Manufacture of special-purpose machinery').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2821').optional(),
      '#text': z
        .literal('Manufacture of agricultural and forestry machinery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2822').optional(),
      '#text': z
        .literal('Manufacture of metal-forming machinery and machine tools')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2823').optional(),
      '#text': z.literal('Manufacture of machinery for metallurgy').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2824').optional(),
      '#text': z
        .literal(
          'Manufacture of machinery for mining, quarrying and construction',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2825').optional(),
      '#text': z
        .literal(
          'Manufacture of machinery for food, beverage and tobacco processing',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2826').optional(),
      '#text': z
        .literal(
          'Manufacture of machinery for textile, apparel and leather production',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2829').optional(),
      '#text': z
        .literal('Manufacture of other special-purpose machinery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('29').optional(),
      '#text': z
        .literal('Manufacture of motor vehicles, trailers and semi-trailers')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('291').optional(),
      '#text': z.literal('Manufacture of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2910').optional(),
      '#text': z.literal('Manufacture of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('292').optional(),
      '#text': z
        .literal(
          'Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2920').optional(),
      '#text': z
        .literal(
          'Manufacture of bodies (coachwork) for motor vehicles; manufacture of trailers and semi-trailers',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('293').optional(),
      '#text': z
        .literal('Manufacture of parts and accessories for motor vehicles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('2930').optional(),
      '#text': z
        .literal('Manufacture of parts and accessories for motor vehicles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('30').optional(),
      '#text': z.literal('Manufacture of other transport equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('301').optional(),
      '#text': z.literal('Building of ships and boats').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3011').optional(),
      '#text': z
        .literal('Building of ships and floating structures')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3012').optional(),
      '#text': z.literal('Building of pleasure and sporting boats').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('302').optional(),
      '#text': z
        .literal('Manufacture of railway locomotives and rolling stock')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3020').optional(),
      '#text': z
        .literal('Manufacture of railway locomotives and rolling stock')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('303').optional(),
      '#text': z
        .literal('Manufacture of air and spacecraft and related machinery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3030').optional(),
      '#text': z
        .literal('Manufacture of air and spacecraft and related machinery')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('304').optional(),
      '#text': z
        .literal('Manufacture of military fighting vehicles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3040').optional(),
      '#text': z
        .literal('Manufacture of military fighting vehicles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('309').optional(),
      '#text': z
        .literal('Manufacture of transport equipment n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3091').optional(),
      '#text': z.literal('Manufacture of motorcycles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3092').optional(),
      '#text': z
        .literal('Manufacture of bicycles and invalid carriages')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3099').optional(),
      '#text': z
        .literal('Manufacture of other transport equipment n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('31').optional(),
      '#text': z.literal('Manufacture of furniture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('310').optional(),
      '#text': z.literal('Manufacture of furniture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3101').optional(),
      '#text': z.literal('Manufacture of wooden furniture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3102').optional(),
      '#text': z.literal('Manufacture of other furniture').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('32').optional(),
      '#text': z.literal('Other manufacturing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('321').optional(),
      '#text': z
        .literal('Manufacture of jewellery, bijouterie and related articles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3211').optional(),
      '#text': z
        .literal('Manufacture of jewellery and related articles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3212').optional(),
      '#text': z
        .literal('Manufacture of imitation jewellery and related articles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('322').optional(),
      '#text': z.literal('Manufacture of musical instruments').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3220').optional(),
      '#text': z.literal('Manufacture of musical instruments').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('323').optional(),
      '#text': z.literal('Manufacture of sports goods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3230').optional(),
      '#text': z.literal('Manufacture of sports goods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('324').optional(),
      '#text': z.literal('Manufacture of games and toys').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3240').optional(),
      '#text': z.literal('Manufacture of games and toys').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('325').optional(),
      '#text': z
        .literal('Manufacture of medical and dental instruments and supplies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3250').optional(),
      '#text': z
        .literal('Manufacture of medical and dental instruments and supplies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('329').optional(),
      '#text': z.literal('Other manufacturing n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3290').optional(),
      '#text': z.literal('Other manufacturing n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('33').optional(),
      '#text': z
        .literal(
          'Repair, maintenance and installation of machinery and equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('331').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of fabricated metal products, machinery and equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3311').optional(),
      '#text': z
        .literal('Repair and maintenance of fabricated metal products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3312').optional(),
      '#text': z.literal('Repair and maintenance of machinery').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3313').optional(),
      '#text': z
        .literal('Repair and maintenance of electronic and optical equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3314').optional(),
      '#text': z
        .literal('Repair and maintenance of electrical equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3315').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of transport equipment, except motor vehicles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3319').optional(),
      '#text': z
        .literal('Repair and maintenance of other equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('332').optional(),
      '#text': z
        .literal('Installation of industrial machinery and equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3320').optional(),
      '#text': z
        .literal('Installation of industrial machinery and equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('D').optional(),
      '#text': z
        .literal('Electricity, gas, steam and air conditioning supply')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('35').optional(),
      '#text': z
        .literal('Electricity, gas, steam and air conditioning supply')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('351').optional(),
      '#text': z
        .literal(
          'Electric power generation, transmission and distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3511').optional(),
      '#text': z
        .literal(
          'Electric power generation activities from non-renewable sources',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3512').optional(),
      '#text': z
        .literal('Electric power generation activities from renewable sources')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3513').optional(),
      '#text': z
        .literal('Electric power transmission and distribution activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('352').optional(),
      '#text': z
        .literal(
          'Manufacture of gas; distribution of gaseous fuels through mains',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3520').optional(),
      '#text': z
        .literal(
          'Manufacture of gas; distribution of gaseous fuels through mains',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('353').optional(),
      '#text': z.literal('Steam and air conditioning supply').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3530').optional(),
      '#text': z.literal('Steam and air conditioning supply').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('354').optional(),
      '#text': z
        .literal(
          'Activities of brokers and agents for electric power and natural gas',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3540').optional(),
      '#text': z
        .literal(
          'Activities of brokers and agents for electric power and natural gas',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('E').optional(),
      '#text': z
        .literal(
          'Water supply; sewerage, waste management and remediation activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('36').optional(),
      '#text': z.literal('Water collection, treatment and supply').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('360').optional(),
      '#text': z.literal('Water collection, treatment and supply').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3600').optional(),
      '#text': z.literal('Water collection, treatment and supply').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('37').optional(),
      '#text': z.literal('Sewerage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('370').optional(),
      '#text': z.literal('Sewerage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3700').optional(),
      '#text': z.literal('Sewerage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('38').optional(),
      '#text': z
        .literal(
          'Waste collection, treatment and disposal, and recovery activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('381').optional(),
      '#text': z.literal('Waste collection activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3811').optional(),
      '#text': z.literal('Collection of non-hazardous waste').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3812').optional(),
      '#text': z.literal('Collection of hazardous waste').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('382').optional(),
      '#text': z.literal('Waste treatment and disposal').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3821').optional(),
      '#text': z
        .literal('Treatment and disposal of non-hazardous waste')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3822').optional(),
      '#text': z
        .literal('Treatment and disposal of hazardous waste')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('383').optional(),
      '#text': z.literal('Materials and other waste recovery').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3830').optional(),
      '#text': z.literal('Materials and other waste recovery').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('39').optional(),
      '#text': z
        .literal('Remediation and other waste management service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('390').optional(),
      '#text': z
        .literal('Remediation and other waste management service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('3900').optional(),
      '#text': z
        .literal('Remediation and other waste management service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('F').optional(),
      '#text': z.literal('Construction').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('41').optional(),
      '#text': z
        .literal('Construction of residential and non-residential buildings')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('410').optional(),
      '#text': z
        .literal('Construction of residential and non-residential buildings')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4100').optional(),
      '#text': z
        .literal('Construction of residential and non-residential buildings')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('42').optional(),
      '#text': z.literal('Civil engineering').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('421').optional(),
      '#text': z.literal('Construction of roads and railways').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4210').optional(),
      '#text': z.literal('Construction of roads and railways').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('422').optional(),
      '#text': z.literal('Construction of utility projects').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4220').optional(),
      '#text': z.literal('Construction of utility projects').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('429').optional(),
      '#text': z
        .literal('Construction of other civil engineering projects')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4290').optional(),
      '#text': z
        .literal('Construction of other civil engineering projects')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('43').optional(),
      '#text': z.literal('Specialized construction activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('431').optional(),
      '#text': z.literal('Demolition and site preparation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4311').optional(),
      '#text': z.literal('Demolition').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4312').optional(),
      '#text': z.literal('Site preparation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('432').optional(),
      '#text': z
        .literal(
          'Electrical, plumbing and other construction installation activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4321').optional(),
      '#text': z.literal('Electrical installation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4322').optional(),
      '#text': z
        .literal('Plumbing, heat and air-conditioning installation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4329').optional(),
      '#text': z.literal('Other construction installation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('433').optional(),
      '#text': z.literal('Building completion and finishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4330').optional(),
      '#text': z.literal('Building completion and finishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('434').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for specialized construction services',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4340').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for specialized construction services',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('439').optional(),
      '#text': z
        .literal('Other specialized construction activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4390').optional(),
      '#text': z
        .literal('Other specialized construction activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('G').optional(),
      '#text': z.literal('Wholesale and retail trade').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('46').optional(),
      '#text': z.literal('Wholesale trade').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('461').optional(),
      '#text': z.literal('Wholesale on a fee or contract basis').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4610').optional(),
      '#text': z.literal('Wholesale on a fee or contract basis').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('462').optional(),
      '#text': z
        .literal('Wholesale of agricultural raw materials and live animals')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4620').optional(),
      '#text': z
        .literal('Wholesale of agricultural raw materials and live animals')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('463').optional(),
      '#text': z.literal('Wholesale of food, beverages and tobacco').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4630').optional(),
      '#text': z.literal('Wholesale of food, beverages and tobacco').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('464').optional(),
      '#text': z.literal('Wholesale of household goods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4641').optional(),
      '#text': z
        .literal('Wholesale of textiles, clothing and footwear')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4642').optional(),
      '#text': z
        .literal(
          'Wholesale of household, office and shop furniture, carpets and lighting equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4649').optional(),
      '#text': z.literal('Wholesale of other household goods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('465').optional(),
      '#text': z
        .literal('Wholesale of machinery, equipment and supplies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4651').optional(),
      '#text': z
        .literal(
          'Wholesale of computers, computer peripheral equipment and software',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4652').optional(),
      '#text': z
        .literal(
          'Wholesale of electronic and telecommunications equipment and parts',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4653').optional(),
      '#text': z
        .literal('Wholesale of agricultural machinery, equipment and supplies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4659').optional(),
      '#text': z
        .literal('Wholesale of other machinery and equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('466').optional(),
      '#text': z
        .literal(
          'Wholesale of motor vehicles, motorcycles and related parts and accessories',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4661').optional(),
      '#text': z.literal('Wholesale of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4662').optional(),
      '#text': z
        .literal('Wholesale of motor vehicle parts and accessories')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4663').optional(),
      '#text': z
        .literal('Wholesale of motorcycles, motorcycle parts and accessories')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('467').optional(),
      '#text': z.literal('Other specialized wholesale').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4671').optional(),
      '#text': z
        .literal(
          'Wholesale of solid, liquid and gaseous fuels and related products',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4672').optional(),
      '#text': z.literal('Wholesale of metals and metal ores').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4673').optional(),
      '#text': z
        .literal(
          'Wholesale of construction materials, hardware, plumbing and heating equipment and supplies',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4679').optional(),
      '#text': z
        .literal(
          'Wholesale of chemicals, waste and scrap and other products n.e.c.',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('469').optional(),
      '#text': z.literal('Non-specialized wholesale trade').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4690').optional(),
      '#text': z.literal('Non-specialized wholesale trade').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('47').optional(),
      '#text': z.literal('Retail trade').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('471').optional(),
      '#text': z.literal('Non-specialized retail sale').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4711').optional(),
      '#text': z
        .literal(
          'Non-specialized retail sale with food, beverages or tobacco predominating',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4719').optional(),
      '#text': z.literal('Other non-specialized retail sale').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('472').optional(),
      '#text': z
        .literal('Retail sale of food, beverages and tobacco')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4721').optional(),
      '#text': z.literal('Retail sale of food').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4722').optional(),
      '#text': z.literal('Retail sale of beverages').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4723').optional(),
      '#text': z.literal('Retail sale of tobacco products').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('473').optional(),
      '#text': z.literal('Retail sale of automotive fuel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4730').optional(),
      '#text': z.literal('Retail sale of automotive fuel').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('474').optional(),
      '#text': z
        .literal('Retail sale of information and communication equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4740').optional(),
      '#text': z
        .literal('Retail sale of information and communication equipment')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('475').optional(),
      '#text': z.literal('Retail sale of other household equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4751').optional(),
      '#text': z.literal('Retail sale of textiles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4752').optional(),
      '#text': z
        .literal(
          'Retail sale of hardware, building materials, paints and glass',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4753').optional(),
      '#text': z
        .literal('Retail sale of carpets, rugs, wall and floor coverings')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4759').optional(),
      '#text': z
        .literal(
          'Retail sale of electrical household appliances, furniture, lighting equipment and other household articles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('476').optional(),
      '#text': z
        .literal('Retail sale of cultural and recreational goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4761').optional(),
      '#text': z
        .literal(
          'Retail sale of books, newspapers, stationery and office supplies',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4762').optional(),
      '#text': z.literal('Retail sale of sporting equipment').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4763').optional(),
      '#text': z.literal('Retail sale of games and toys').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4769').optional(),
      '#text': z
        .literal('Retail sale of cultural and recreational goods n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('477').optional(),
      '#text': z
        .literal(
          'Retail sale of other goods, except motor vehicles and motorcycles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4771').optional(),
      '#text': z
        .literal('Retail sale of clothing, footwear and leather articles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4772').optional(),
      '#text': z
        .literal(
          'Retail sale of pharmaceutical and medical goods, cosmetic and toilet articles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4773').optional(),
      '#text': z.literal('Retail sale of other new goods n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4774').optional(),
      '#text': z.literal('Retail sale of second-hand goods').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('478').optional(),
      '#text': z
        .literal(
          'Retail sale of motor vehicles, motorcycles and related parts and accessories',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4781').optional(),
      '#text': z.literal('Retail sale of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4782').optional(),
      '#text': z
        .literal('Retail sale of motor vehicle parts and accessories')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4783').optional(),
      '#text': z
        .literal(
          'Retail sale of motorcycles, motorcycles parts and accessories',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('479').optional(),
      '#text': z
        .literal('Intermediation service activities for retail sale')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4790').optional(),
      '#text': z
        .literal('Intermediation service activities for retail sale')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('H').optional(),
      '#text': z.literal('Transportation and storage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('49').optional(),
      '#text': z
        .literal('Land transport and transport via pipelines')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('491').optional(),
      '#text': z.literal('Transport via railways').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4911').optional(),
      '#text': z.literal('Passenger rail transport, interurban').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4912').optional(),
      '#text': z.literal('Freight rail transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('492').optional(),
      '#text': z.literal('Other land transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4921').optional(),
      '#text': z
        .literal('Urban and suburban passenger land transport')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4922').optional(),
      '#text': z.literal('Other passenger land transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4923').optional(),
      '#text': z.literal('Freight transport by road').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('493').optional(),
      '#text': z.literal('Transport via pipeline').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('4930').optional(),
      '#text': z.literal('Transport via pipeline').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('50').optional(),
      '#text': z.literal('Water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('501').optional(),
      '#text': z.literal('Sea and coastal water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5011').optional(),
      '#text': z
        .literal('Sea and coastal passenger water transport')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5012').optional(),
      '#text': z.literal('Sea and coastal freight water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('502').optional(),
      '#text': z.literal('Inland water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5021').optional(),
      '#text': z.literal('Inland passenger water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5022').optional(),
      '#text': z.literal('Inland freight water transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('51').optional(),
      '#text': z.literal('Air transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('511').optional(),
      '#text': z.literal('Passenger air transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5110').optional(),
      '#text': z.literal('Passenger air transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('512').optional(),
      '#text': z.literal('Freight air transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5120').optional(),
      '#text': z.literal('Freight air transport').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('52').optional(),
      '#text': z
        .literal('Warehousing and support activities for transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('521').optional(),
      '#text': z.literal('Warehousing and storage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5210').optional(),
      '#text': z.literal('Warehousing and storage').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('522').optional(),
      '#text': z.literal('Support activities for transportation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5221').optional(),
      '#text': z
        .literal('Service activities incidental to land transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5222').optional(),
      '#text': z
        .literal('Service activities incidental to water transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5223').optional(),
      '#text': z
        .literal('Service activities incidental to air transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5224').optional(),
      '#text': z.literal('Cargo handling').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5229').optional(),
      '#text': z
        .literal('Other support activities for transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('523').optional(),
      '#text': z
        .literal('Intermediation service activities for transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5231').optional(),
      '#text': z
        .literal('Intermediation service activities for freight transportation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5232').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for passenger transportation',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('53').optional(),
      '#text': z.literal('Postal and courier activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('531').optional(),
      '#text': z.literal('Postal activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5310').optional(),
      '#text': z.literal('Postal activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('532').optional(),
      '#text': z.literal('Courier activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5320').optional(),
      '#text': z.literal('Courier activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('533').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for postal and courier activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5330').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for postal and courier activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('I').optional(),
      '#text': z
        .literal('Accommodation and food service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('55').optional(),
      '#text': z.literal('Accommodation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('551').optional(),
      '#text': z
        .literal('Hotels and similar accommodation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5510').optional(),
      '#text': z
        .literal('Hotels and similar accommodation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('552').optional(),
      '#text': z
        .literal('Other short term accommodation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5520').optional(),
      '#text': z
        .literal('Other short term accommodation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('553').optional(),
      '#text': z
        .literal(
          'Camping grounds, recreational vehicle parks and trailer parks',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5530').optional(),
      '#text': z
        .literal(
          'Camping grounds, recreational vehicle parks and trailer parks',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('554').optional(),
      '#text': z
        .literal('Intermediation service activities for accommodation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5540').optional(),
      '#text': z
        .literal('Intermediation service activities for accommodation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('559').optional(),
      '#text': z.literal('Other accommodation n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5590').optional(),
      '#text': z.literal('Other accommodation n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('56').optional(),
      '#text': z.literal('Food and beverage service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('561').optional(),
      '#text': z
        .literal('Restaurants and mobile food service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5610').optional(),
      '#text': z
        .literal('Restaurants and mobile food service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('562').optional(),
      '#text': z
        .literal('Event catering and other food service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5621').optional(),
      '#text': z.literal('Event catering activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5629').optional(),
      '#text': z.literal('Other food service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('563').optional(),
      '#text': z.literal('Beverage serving activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5630').optional(),
      '#text': z.literal('Beverage serving activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('564').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for food and beverage services activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5640').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for food and beverage services activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('J').optional(),
      '#text': z
        .literal(
          'Publishing, broadcasting, and content production and distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('58').optional(),
      '#text': z.literal('Publishing activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('581').optional(),
      '#text': z
        .literal(
          'Publishing of books, newspapers, periodicals and other publishing activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5811').optional(),
      '#text': z.literal('Publishing of books').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5812').optional(),
      '#text': z.literal('Publishing of newspapers').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5813').optional(),
      '#text': z.literal('Publishing of journals and periodicals').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5819').optional(),
      '#text': z.literal('Other publishing activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('582').optional(),
      '#text': z.literal('Software publishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5821').optional(),
      '#text': z.literal('Publishing of video games').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5829').optional(),
      '#text': z.literal('Other software publishing').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('59').optional(),
      '#text': z
        .literal(
          'Motion picture, video and television programme production, sound recording and music publishing activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('591').optional(),
      '#text': z
        .literal('Motion picture, video and television programme activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5911').optional(),
      '#text': z
        .literal(
          'Motion picture, video and television programme production activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5912').optional(),
      '#text': z
        .literal(
          'Motion picture, video and television programme post-production activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5913').optional(),
      '#text': z
        .literal(
          'Motion picture, video and television programme distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5914').optional(),
      '#text': z.literal('Motion picture projection activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('592').optional(),
      '#text': z
        .literal('Sound recording and music publishing activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('5920').optional(),
      '#text': z
        .literal('Sound recording and music publishing activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('60').optional(),
      '#text': z
        .literal(
          'Programming, broadcasting, news agency and other content distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('601').optional(),
      '#text': z
        .literal('Radio broadcasting and audio distribution activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6010').optional(),
      '#text': z
        .literal('Radio broadcasting and audio distribution activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('602').optional(),
      '#text': z
        .literal(
          'Television programming, broadcasting and video distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6020').optional(),
      '#text': z
        .literal(
          'Television programming, broadcasting and video distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('603').optional(),
      '#text': z
        .literal('News agency and other content distribution activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6031').optional(),
      '#text': z.literal('News agency activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6039').optional(),
      '#text': z
        .literal(
          'Social network sites and other content distribution activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('K').optional(),
      '#text': z
        .literal(
          'Telecommunications, computer programming, consultancy, computing infrastructure, and other information service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('61').optional(),
      '#text': z.literal('Telecommunications').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('611').optional(),
      '#text': z
        .literal('Wired, wireless, and satellite telecommunication activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6110').optional(),
      '#text': z
        .literal('Wired, wireless, and satellite telecommunication activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('612').optional(),
      '#text': z
        .literal(
          'Telecommunication reselling activities and intermediation service activities for telecommunication',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6120').optional(),
      '#text': z
        .literal(
          'Telecommunication reselling activities and intermediation service activities for telecommunication',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('619').optional(),
      '#text': z.literal('Other telecommunication activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6190').optional(),
      '#text': z.literal('Other telecommunication activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('62').optional(),
      '#text': z
        .literal('Computer programming, consultancy and related activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('621').optional(),
      '#text': z.literal('Computer programming activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6211').optional(),
      '#text': z
        .literal(
          'Development of video games, video game software, and video game software tools',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6219').optional(),
      '#text': z.literal('Other computer programming activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('622').optional(),
      '#text': z
        .literal(
          'Computer consultancy and computer facilities management activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6220').optional(),
      '#text': z
        .literal(
          'Computer consultancy and computer facilities management activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('629').optional(),
      '#text': z
        .literal('Other information technology and computer service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6290').optional(),
      '#text': z
        .literal('Other information technology and computer service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('63').optional(),
      '#text': z
        .literal(
          'Computing infrastructure, data processing, hosting, and other information service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('631').optional(),
      '#text': z
        .literal(
          'Computing infrastructure, data processing, hosting and related activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6310').optional(),
      '#text': z
        .literal(
          'Computing infrastructure, data processing, hosting and related activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('639').optional(),
      '#text': z
        .literal(
          'Web search portals activities and other information service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6390').optional(),
      '#text': z
        .literal(
          'Web search portals activities and other information service activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('L').optional(),
      '#text': z.literal('Financial and insurance activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('64').optional(),
      '#text': z
        .literal(
          'Financial service activities, except insurance and pension funding',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('641').optional(),
      '#text': z.literal('Monetary intermediation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6411').optional(),
      '#text': z.literal('Central banking').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6419').optional(),
      '#text': z.literal('Other monetary intermediation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('642').optional(),
      '#text': z
        .literal('Activities of holding companies and financing conduits')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6421').optional(),
      '#text': z.literal('Activities of holding companies').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6422').optional(),
      '#text': z.literal('Activities of financing conduits').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('643').optional(),
      '#text': z
        .literal('Activities of trusts, funds and similar financial entities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6431').optional(),
      '#text': z.literal('Activities of money market funds').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6432').optional(),
      '#text': z
        .literal('Activities of non-money market investments funds')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6433').optional(),
      '#text': z
        .literal('Activities of trust, estate and agency accounts')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('649').optional(),
      '#text': z
        .literal(
          'Other financial service activities, except insurance and pension funding activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6491').optional(),
      '#text': z.literal('Financial leasing activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6492').optional(),
      '#text': z.literal('International trade financing activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6493').optional(),
      '#text': z.literal('Factoring activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6494').optional(),
      '#text': z.literal('Securitisation activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6495').optional(),
      '#text': z.literal('Other credit granting activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6499').optional(),
      '#text': z
        .literal(
          'Other financial service activities n.e.c., except insurance and pension funding activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('65').optional(),
      '#text': z
        .literal(
          'Insurance, reinsurance and pension funding, except compulsory social security',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('651').optional(),
      '#text': z.literal('Insurance').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6511').optional(),
      '#text': z.literal('Life insurance').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6512').optional(),
      '#text': z.literal('Non-life insurance').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('652').optional(),
      '#text': z.literal('Reinsurance').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6520').optional(),
      '#text': z.literal('Reinsurance').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('653').optional(),
      '#text': z.literal('Pension funding').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6530').optional(),
      '#text': z.literal('Pension funding').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('66').optional(),
      '#text': z
        .literal(
          'Activities auxiliary to financial service and insurance activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('661').optional(),
      '#text': z
        .literal(
          'Activities auxiliary to financial services, except insurance and pension funding',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6611').optional(),
      '#text': z.literal('Administration of financial markets').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6612').optional(),
      '#text': z
        .literal('Security and commodity contracts brokerage')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6619').optional(),
      '#text': z
        .literal(
          'Other activities auxiliary to financial service activities, except insurance and pension funding',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('662').optional(),
      '#text': z
        .literal('Activities auxiliary to insurance and pension funding')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6621').optional(),
      '#text': z.literal('Risk and damage evaluation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6622').optional(),
      '#text': z
        .literal('Activities of insurance agents and brokers')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6629').optional(),
      '#text': z
        .literal('Other activities auxiliary to insurance and pension funding')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('663').optional(),
      '#text': z.literal('Fund management activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6630').optional(),
      '#text': z.literal('Fund management activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('M').optional(),
      '#text': z.literal('Real estate activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('68').optional(),
      '#text': z.literal('Real estate activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('681').optional(),
      '#text': z
        .literal('Real estate activities with own or leased property')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6810').optional(),
      '#text': z
        .literal('Real estate activities with own or leased property')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('682').optional(),
      '#text': z
        .literal('Real estate activities on a fee or contract basis')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6821').optional(),
      '#text': z
        .literal('Intermediation service activities for real estate')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6829').optional(),
      '#text': z
        .literal('Other real estate activities on a fee or contract basis')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('N').optional(),
      '#text': z
        .literal('Professional, scientific and technical activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('69').optional(),
      '#text': z.literal('Legal and accounting activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('691').optional(),
      '#text': z.literal('Legal activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6910').optional(),
      '#text': z.literal('Legal activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('692').optional(),
      '#text': z
        .literal(
          'Accounting, bookkeeping and auditing activities; tax consultancy',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('6920').optional(),
      '#text': z
        .literal(
          'Accounting, bookkeeping and auditing activities; tax consultancy',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('70').optional(),
      '#text': z
        .literal(
          'Activities of head offices; management consultancy activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('701').optional(),
      '#text': z.literal('Activities of head offices').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7010').optional(),
      '#text': z.literal('Activities of head offices').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('702').optional(),
      '#text': z
        .literal('Business and other management consultancy activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7020').optional(),
      '#text': z
        .literal('Business and other management consultancy activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('71').optional(),
      '#text': z
        .literal(
          'Architectural and engineering activities; technical testing and analysis',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('711').optional(),
      '#text': z
        .literal(
          'Architectural and engineering, and related technical consultancy activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7110').optional(),
      '#text': z
        .literal(
          'Architectural and engineering, and related technical consultancy activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('712').optional(),
      '#text': z.literal('Technical testing and analysis').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7120').optional(),
      '#text': z.literal('Technical testing and analysis').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('72').optional(),
      '#text': z.literal('Scientific research and development').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('721').optional(),
      '#text': z
        .literal(
          'Research and experimental development on natural sciences and engineering',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7210').optional(),
      '#text': z
        .literal(
          'Research and experimental development on natural sciences and engineering',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('722').optional(),
      '#text': z
        .literal(
          'Research and experimental development on social sciences and humanities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7220').optional(),
      '#text': z
        .literal(
          'Research and experimental development on social sciences and humanities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('73').optional(),
      '#text': z
        .literal(
          'Activities of advertising, market research and public relations',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('731').optional(),
      '#text': z.literal('Advertising activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7310').optional(),
      '#text': z.literal('Advertising activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('732').optional(),
      '#text': z
        .literal('Market research and public opinion polling activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7320').optional(),
      '#text': z
        .literal('Market research and public opinion polling activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('733').optional(),
      '#text': z.literal('Public relations activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7330').optional(),
      '#text': z.literal('Public relations activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('74').optional(),
      '#text': z
        .literal('Other professional, scientific and technical activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('741').optional(),
      '#text': z.literal('Specialized design activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7410').optional(),
      '#text': z.literal('Specialized design activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('742').optional(),
      '#text': z.literal('Photographic activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7420').optional(),
      '#text': z.literal('Photographic activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('743').optional(),
      '#text': z
        .literal('Translation and interpretation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7430').optional(),
      '#text': z
        .literal('Translation and interpretation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('749').optional(),
      '#text': z
        .literal(
          'Other professional, scientific and technical activities n.e.c.',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7491').optional(),
      '#text': z
        .literal('Patent brokering and marketing service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7499').optional(),
      '#text': z
        .literal(
          'All other professional, scientific and technical activities n.e.c.',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('75').optional(),
      '#text': z.literal('Veterinary activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('750').optional(),
      '#text': z.literal('Veterinary activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7500').optional(),
      '#text': z.literal('Veterinary activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('O').optional(),
      '#text': z
        .literal('Administrative and support service activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('77').optional(),
      '#text': z.literal('Rental and leasing activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('771').optional(),
      '#text': z.literal('Rental and leasing of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7710').optional(),
      '#text': z.literal('Rental and leasing of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('772').optional(),
      '#text': z
        .literal('Rental and leasing of personal and household goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7721').optional(),
      '#text': z
        .literal('Rental and leasing of recreational and sports goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7729').optional(),
      '#text': z
        .literal('Rental and leasing of other personal and household goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('773').optional(),
      '#text': z
        .literal(
          'Rental and leasing of other machinery, equipment and tangible goods',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7730').optional(),
      '#text': z
        .literal(
          'Rental and leasing of other machinery, equipment and tangible goods',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('774').optional(),
      '#text': z
        .literal(
          'Leasing of intellectual property and similar products, except copyrighted works',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7740').optional(),
      '#text': z
        .literal(
          'Leasing of intellectual property and similar products, except copyrighted works',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('775').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for rental and leasing of tangible goods and non-financial intangible assets',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7751').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for rental and leasing of cars, motorhomes and trailers',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7752').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for rental and leasing of other tangible goods and non-financial intangible assets',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('78').optional(),
      '#text': z.literal('Employment activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('781').optional(),
      '#text': z
        .literal('Activities of employment placement agencies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7810').optional(),
      '#text': z
        .literal('Activities of employment placement agencies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('782').optional(),
      '#text': z
        .literal(
          'Temporary employment agency activities and other human resource provisions',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7820').optional(),
      '#text': z
        .literal(
          'Temporary employment agency activities and other human resource provisions',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('79').optional(),
      '#text': z
        .literal(
          'Travel agency, tour operator, and other travel related activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('791').optional(),
      '#text': z
        .literal('Travel agency and tour operator activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7911').optional(),
      '#text': z.literal('Travel agency activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7912').optional(),
      '#text': z.literal('Tour operator activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('799').optional(),
      '#text': z.literal('Other travel related activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('7990').optional(),
      '#text': z.literal('Other travel related activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('80').optional(),
      '#text': z.literal('Investigation and security activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('801').optional(),
      '#text': z.literal('Investigation and security activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8011').optional(),
      '#text': z
        .literal('Investigation and private security activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8019').optional(),
      '#text': z.literal('Security activities n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('81').optional(),
      '#text': z
        .literal('Services to buildings and landscape activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('811').optional(),
      '#text': z.literal('Combined facilities support activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8110').optional(),
      '#text': z.literal('Combined facilities support activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('812').optional(),
      '#text': z.literal('Cleaning activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8121').optional(),
      '#text': z.literal('General cleaning of buildings').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8129').optional(),
      '#text': z.literal('Other cleaning activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('813').optional(),
      '#text': z.literal('Landscape service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8130').optional(),
      '#text': z.literal('Landscape service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('82').optional(),
      '#text': z
        .literal(
          'Office administrative, office support and other business support activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('821').optional(),
      '#text': z
        .literal('Office administrative and support activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8210').optional(),
      '#text': z
        .literal('Office administrative and support activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('822').optional(),
      '#text': z.literal('Activities of call centres').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8220').optional(),
      '#text': z.literal('Activities of call centres').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('823').optional(),
      '#text': z
        .literal('Organization of conventions and trade shows')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8230').optional(),
      '#text': z
        .literal('Organization of conventions and trade shows')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('824').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for business support activities n.e.c., except financial intermediation',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8240').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for business support activities n.e.c., except financial intermediation',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('829').optional(),
      '#text': z
        .literal('Business support service activities n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8291').optional(),
      '#text': z
        .literal('Activities of collection agencies and credit bureaus')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8292').optional(),
      '#text': z.literal('Packaging activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8299').optional(),
      '#text': z
        .literal('Other business support service activities n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('P').optional(),
      '#text': z
        .literal(
          'Public administration and defence; compulsory social security',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('84').optional(),
      '#text': z
        .literal(
          'Public administration and defence; compulsory social security',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('841').optional(),
      '#text': z
        .literal(
          'Administration of the State and the economic, social and environmental policies of the community',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8411').optional(),
      '#text': z.literal('General public administration activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8412').optional(),
      '#text': z
        .literal(
          'Regulation of the activities of providing health care, education, cultural services and other social services, excluding social security and environment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8413').optional(),
      '#text': z
        .literal(
          'Regulation of the activities of providing environmental services',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8414').optional(),
      '#text': z
        .literal(
          'Regulation of and contribution to more efficient operation of businesses',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('842').optional(),
      '#text': z
        .literal('Provision of services to the community as a whole')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8421').optional(),
      '#text': z.literal('Foreign affairs').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8422').optional(),
      '#text': z.literal('Defence activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8423').optional(),
      '#text': z.literal('Public order and safety activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('843').optional(),
      '#text': z.literal('Compulsory social security activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8430').optional(),
      '#text': z.literal('Compulsory social security activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('Q').optional(),
      '#text': z.literal('Education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('85').optional(),
      '#text': z.literal('Education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('851').optional(),
      '#text': z.literal('Pre-primary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8510').optional(),
      '#text': z.literal('Pre-primary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('852').optional(),
      '#text': z.literal('Primary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8520').optional(),
      '#text': z.literal('Primary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('853').optional(),
      '#text': z
        .literal('Secondary and post-secondary non-tertiary education')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8531').optional(),
      '#text': z.literal('General secondary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8532').optional(),
      '#text': z.literal('Vocational secondary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8533').optional(),
      '#text': z.literal('Post-secondary non-tertiary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('854').optional(),
      '#text': z.literal('Tertiary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8540').optional(),
      '#text': z.literal('Tertiary education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('855').optional(),
      '#text': z.literal('Other education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8551').optional(),
      '#text': z.literal('Sports and recreation education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8552').optional(),
      '#text': z.literal('Cultural education').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8553').optional(),
      '#text': z.literal('Driving school activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8559').optional(),
      '#text': z.literal('Other education n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('856').optional(),
      '#text': z.literal('Educational support activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8561').optional(),
      '#text': z
        .literal('Intermediation service activities for courses and tutors')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8569').optional(),
      '#text': z.literal('Other educational support activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('R').optional(),
      '#text': z.literal('Human health and social work activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('86').optional(),
      '#text': z.literal('Human health activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('861').optional(),
      '#text': z.literal('Hospital activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8610').optional(),
      '#text': z.literal('Hospital activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('862').optional(),
      '#text': z.literal('Medical and dental practice activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8620').optional(),
      '#text': z.literal('Medical and dental practice activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('869').optional(),
      '#text': z.literal('Other human health activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8691').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for medical, dental, and other human health services',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8699').optional(),
      '#text': z.literal('Other human health activities n.e.c').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('87').optional(),
      '#text': z.literal('Residential care activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('871').optional(),
      '#text': z.literal('Residential nursing care activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8710').optional(),
      '#text': z.literal('Residential nursing care activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('872').optional(),
      '#text': z
        .literal(
          'Residential care activities for persons living with or having a diagnosis of a mental illness or substance abuse',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8720').optional(),
      '#text': z
        .literal(
          'Residential care activities for persons living with or having a diagnosis of a mental illness or substance abuse',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('873').optional(),
      '#text': z
        .literal(
          'Residential care activities for older persons or persons with physical disabilities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8730').optional(),
      '#text': z
        .literal(
          'Residential care activities for older persons or persons with physical disabilities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('879').optional(),
      '#text': z.literal('Other residential care activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8791').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for residential care activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8799').optional(),
      '#text': z.literal('Other residential care activities n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('88').optional(),
      '#text': z
        .literal('Social work activities without accommodation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('881').optional(),
      '#text': z
        .literal(
          'Social work activities without accommodation for older persons or persons with disabilities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8810').optional(),
      '#text': z
        .literal(
          'Social work activities without accommodation for older persons or persons with disabilities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('889').optional(),
      '#text': z
        .literal('Other social work activities without accommodation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('8890').optional(),
      '#text': z
        .literal('Other social work activities without accommodation')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('S').optional(),
      '#text': z.literal('Arts, sports and recreation').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('90').optional(),
      '#text': z
        .literal('Arts creation and performing arts activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('901').optional(),
      '#text': z.literal('Arts creation activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9011').optional(),
      '#text': z
        .literal('Literary creation and musical composition activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9012').optional(),
      '#text': z.literal('Visual arts creation activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9013').optional(),
      '#text': z.literal('Other arts creation activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('902').optional(),
      '#text': z.literal('Activities of performing arts').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9020').optional(),
      '#text': z.literal('Activities of performing arts').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('903').optional(),
      '#text': z
        .literal('Support activities to arts creation and performing arts')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9031').optional(),
      '#text': z.literal('Operation of arts facilities and sites').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9039').optional(),
      '#text': z
        .literal(
          'Other support activities to arts creation and performing arts',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('91').optional(),
      '#text': z
        .literal('Library, archives, museum and other cultural activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('911').optional(),
      '#text': z.literal('Library and archive activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9111').optional(),
      '#text': z.literal('Library activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9112').optional(),
      '#text': z.literal('Archive activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('912').optional(),
      '#text': z
        .literal('Museum, collection, historical site and monument activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9121').optional(),
      '#text': z.literal('Museum and collection activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9122').optional(),
      '#text': z.literal('Historical site and monument activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('913').optional(),
      '#text': z
        .literal(
          'Conservation, restoration and other support activities for cultural heritage',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9130').optional(),
      '#text': z
        .literal(
          'Conservation, restoration and other support activities for cultural heritage',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('914').optional(),
      '#text': z
        .literal(
          'Botanical and zoological garden and nature reserve activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9141').optional(),
      '#text': z
        .literal('Botanical and zoological garden activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9142').optional(),
      '#text': z.literal('Nature reserve activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('92').optional(),
      '#text': z.literal('Gambling and betting activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('920').optional(),
      '#text': z.literal('Gambling and betting activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9200').optional(),
      '#text': z.literal('Gambling and betting activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('93').optional(),
      '#text': z
        .literal('Sports activities and amusement and recreation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('931').optional(),
      '#text': z.literal('Sports activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9311').optional(),
      '#text': z.literal('Operation of sports facilities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9312').optional(),
      '#text': z.literal('Activities of sports clubs').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9319').optional(),
      '#text': z.literal('Other sports activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('932').optional(),
      '#text': z.literal('Amusement and recreation activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9321').optional(),
      '#text': z
        .literal('Activities of amusement parks and theme parks')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9329').optional(),
      '#text': z
        .literal('Other amusement and recreation activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('T').optional(),
      '#text': z.literal('Other service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('94').optional(),
      '#text': z.literal('Activities of membership organizations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('941').optional(),
      '#text': z
        .literal(
          'Activities of business, employers and professional membership organizations',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9411').optional(),
      '#text': z
        .literal(
          'Activities of business and employers membership organizations',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9412').optional(),
      '#text': z
        .literal('Activities of professional membership organizations')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('942').optional(),
      '#text': z.literal('Activities of trade unions').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9420').optional(),
      '#text': z.literal('Activities of trade unions').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('949').optional(),
      '#text': z
        .literal('Activities of other membership organizations')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9491').optional(),
      '#text': z.literal('Activities of religious organizations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9492').optional(),
      '#text': z.literal('Activities of political organizations').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9499').optional(),
      '#text': z
        .literal('Activities of other membership organizations n.e.c.')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('95').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('951').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of computers and communication equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9510').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of computers and communication equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('952').optional(),
      '#text': z
        .literal('Repair and maintenance of personal and household goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9521').optional(),
      '#text': z
        .literal('Repair and maintenance of consumer electronics')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9522').optional(),
      '#text': z
        .literal(
          'Repair and maintenance of household appliances and home and garden equipment',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9523').optional(),
      '#text': z
        .literal('Repair and maintenance of footwear and leather goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9524').optional(),
      '#text': z
        .literal('Repair and maintenance of furniture and home furnishings')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9529').optional(),
      '#text': z
        .literal('Repair and maintenance of other personal and household goods')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('953').optional(),
      '#text': z
        .literal('Repair and maintenance of motor vehicles and motorcycles')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9531').optional(),
      '#text': z.literal('Repair and maintenance of motor vehicles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9532').optional(),
      '#text': z.literal('Repair and maintenance of motorcycles').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('954').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9540').optional(),
      '#text': z
        .literal(
          'Intermediation service activities for repair and maintenance of computers, personal and household goods, and motor vehicles and motorcycles',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('96').optional(),
      '#text': z.literal('Personal service activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('961').optional(),
      '#text': z
        .literal('Washing and cleaning of textile and fur products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9610').optional(),
      '#text': z
        .literal('Washing and cleaning of textile and fur products')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('962').optional(),
      '#text': z
        .literal(
          'Hairdressing, beauty treatment, day spa and similar activities',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9621').optional(),
      '#text': z.literal('Hairdressing and barber activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9622').optional(),
      '#text': z
        .literal('Beauty care and other beauty treatment activities')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9623').optional(),
      '#text': z.literal('Day spa, sauna and steam bath activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('963').optional(),
      '#text': z.literal('Funeral and related activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9630').optional(),
      '#text': z.literal('Funeral and related activities').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('964').optional(),
      '#text': z
        .literal('Intermediation service activities for personal services')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9640').optional(),
      '#text': z
        .literal('Intermediation service activities for personal services')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('969').optional(),
      '#text': z.literal('Other personal service activities n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9690').optional(),
      '#text': z.literal('Other personal service activities n.e.c.').optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('U').optional(),
      '#text': z
        .literal(
          'Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('97').optional(),
      '#text': z
        .literal('Activities of households as employers of domestic personnel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('970').optional(),
      '#text': z
        .literal('Activities of households as employers of domestic personnel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9700').optional(),
      '#text': z
        .literal('Activities of households as employers of domestic personnel')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('98').optional(),
      '#text': z
        .literal(
          'Undifferentiated goods- and services-producing activities of private households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('981').optional(),
      '#text': z
        .literal(
          'Undifferentiated goods-producing activities of private households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9810').optional(),
      '#text': z
        .literal(
          'Undifferentiated goods-producing activities of private households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('982').optional(),
      '#text': z
        .literal(
          'Undifferentiated service-producing activities of private households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9820').optional(),
      '#text': z
        .literal(
          'Undifferentiated service-producing activities of private households for own use',
        )
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('0').optional(),
      '@classId': z.literal('V').optional(),
      '#text': z
        .literal('Activities of extraterritorial organizations and bodies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('1').optional(),
      '@classId': z.literal('99').optional(),
      '#text': z
        .literal('Activities of extraterritorial organizations and bodies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('2').optional(),
      '@classId': z.literal('990').optional(),
      '#text': z
        .literal('Activities of extraterritorial organizations and bodies')
        .optional(),
    }) as z.ZodType,
    z.object({
      '@level': z.literal('3').optional(),
      '@classId': z.literal('9900').optional(),
      '#text': z
        .literal('Activities of extraterritorial organizations and bodies')
        .optional(),
    }) as z.ZodType,
  ] as z.ZodType[],
  {
    property: '@classId',
    values: [
      'A',
      '01',
      '011',
      '0111',
      '0112',
      '0113',
      '0114',
      '0115',
      '0116',
      '0119',
      '012',
      '0121',
      '0122',
      '0123',
      '0124',
      '0125',
      '0126',
      '0127',
      '0128',
      '0129',
      '013',
      '0130',
      '014',
      '0141',
      '0142',
      '0143',
      '0144',
      '0145',
      '0146',
      '0149',
      '015',
      '0150',
      '016',
      '0161',
      '0162',
      '0163',
      '0164',
      '017',
      '0170',
      '02',
      '021',
      '0210',
      '022',
      '0220',
      '023',
      '0230',
      '024',
      '0240',
      '03',
      '031',
      '0311',
      '0312',
      '032',
      '0321',
      '0322',
      '033',
      '0330',
      'B',
      '05',
      '051',
      '0510',
      '052',
      '0520',
      '06',
      '061',
      '0610',
      '062',
      '0620',
      '07',
      '071',
      '0710',
      '072',
      '0721',
      '0729',
      '08',
      '081',
      '0810',
      '089',
      '0891',
      '0892',
      '0893',
      '0899',
      '09',
      '091',
      '0910',
      '099',
      '0990',
      'C',
      '10',
      '101',
      '1010',
      '102',
      '1020',
      '103',
      '1030',
      '104',
      '1040',
      '105',
      '1050',
      '106',
      '1061',
      '1062',
      '107',
      '1071',
      '1072',
      '1073',
      '1074',
      '1075',
      '1076',
      '1079',
      '108',
      '1080',
      '11',
      '110',
      '1101',
      '1102',
      '1103',
      '1104',
      '1105',
      '12',
      '120',
      '1200',
      '13',
      '131',
      '1311',
      '1312',
      '1313',
      '139',
      '1391',
      '1392',
      '1393',
      '1394',
      '1399',
      '14',
      '141',
      '1410',
      '142',
      '1420',
      '143',
      '1430',
      '15',
      '151',
      '1511',
      '1512',
      '152',
      '1520',
      '16',
      '161',
      '1610',
      '162',
      '1621',
      '1622',
      '1623',
      '1629',
      '17',
      '170',
      '1701',
      '1702',
      '1709',
      '18',
      '181',
      '1811',
      '1812',
      '182',
      '1820',
      '19',
      '191',
      '1910',
      '192',
      '1920',
      '20',
      '201',
      '2011',
      '2012',
      '2013',
      '202',
      '2021',
      '2022',
      '2023',
      '2029',
      '203',
      '2030',
      '21',
      '210',
      '2100',
      '22',
      '221',
      '2211',
      '2219',
      '222',
      '2220',
      '23',
      '231',
      '2310',
      '239',
      '2391',
      '2392',
      '2393',
      '2394',
      '2395',
      '2396',
      '2399',
      '24',
      '241',
      '2410',
      '242',
      '2420',
      '243',
      '2431',
      '2432',
      '25',
      '251',
      '2511',
      '2512',
      '2513',
      '252',
      '2520',
      '259',
      '2591',
      '2592',
      '2593',
      '2599',
      '26',
      '261',
      '2611',
      '2619',
      '262',
      '2620',
      '263',
      '2630',
      '264',
      '2640',
      '265',
      '2651',
      '2652',
      '266',
      '2660',
      '267',
      '2670',
      '268',
      '2680',
      '27',
      '271',
      '2710',
      '272',
      '2720',
      '273',
      '2731',
      '2732',
      '2733',
      '274',
      '2740',
      '275',
      '2750',
      '279',
      '2790',
      '28',
      '281',
      '2811',
      '2812',
      '2813',
      '2814',
      '2815',
      '2816',
      '2817',
      '2818',
      '2819',
      '282',
      '2821',
      '2822',
      '2823',
      '2824',
      '2825',
      '2826',
      '2829',
      '29',
      '291',
      '2910',
      '292',
      '2920',
      '293',
      '2930',
      '30',
      '301',
      '3011',
      '3012',
      '302',
      '3020',
      '303',
      '3030',
      '304',
      '3040',
      '309',
      '3091',
      '3092',
      '3099',
      '31',
      '310',
      '3101',
      '3102',
      '32',
      '321',
      '3211',
      '3212',
      '322',
      '3220',
      '323',
      '3230',
      '324',
      '3240',
      '325',
      '3250',
      '329',
      '3290',
      '33',
      '331',
      '3311',
      '3312',
      '3313',
      '3314',
      '3315',
      '3319',
      '332',
      '3320',
      'D',
      '35',
      '351',
      '3511',
      '3512',
      '3513',
      '352',
      '3520',
      '353',
      '3530',
      '354',
      '3540',
      'E',
      '36',
      '360',
      '3600',
      '37',
      '370',
      '3700',
      '38',
      '381',
      '3811',
      '3812',
      '382',
      '3821',
      '3822',
      '383',
      '3830',
      '39',
      '390',
      '3900',
      'F',
      '41',
      '410',
      '4100',
      '42',
      '421',
      '4210',
      '422',
      '4220',
      '429',
      '4290',
      '43',
      '431',
      '4311',
      '4312',
      '432',
      '4321',
      '4322',
      '4329',
      '433',
      '4330',
      '434',
      '4340',
      '439',
      '4390',
      'G',
      '46',
      '461',
      '4610',
      '462',
      '4620',
      '463',
      '4630',
      '464',
      '4641',
      '4642',
      '4649',
      '465',
      '4651',
      '4652',
      '4653',
      '4659',
      '466',
      '4661',
      '4662',
      '4663',
      '467',
      '4671',
      '4672',
      '4673',
      '4679',
      '469',
      '4690',
      '47',
      '471',
      '4711',
      '4719',
      '472',
      '4721',
      '4722',
      '4723',
      '473',
      '4730',
      '474',
      '4740',
      '475',
      '4751',
      '4752',
      '4753',
      '4759',
      '476',
      '4761',
      '4762',
      '4763',
      '4769',
      '477',
      '4771',
      '4772',
      '4773',
      '4774',
      '478',
      '4781',
      '4782',
      '4783',
      '479',
      '4790',
      'H',
      '49',
      '491',
      '4911',
      '4912',
      '492',
      '4921',
      '4922',
      '4923',
      '493',
      '4930',
      '50',
      '501',
      '5011',
      '5012',
      '502',
      '5021',
      '5022',
      '51',
      '511',
      '5110',
      '512',
      '5120',
      '52',
      '521',
      '5210',
      '522',
      '5221',
      '5222',
      '5223',
      '5224',
      '5229',
      '523',
      '5231',
      '5232',
      '53',
      '531',
      '5310',
      '532',
      '5320',
      '533',
      '5330',
      'I',
      '55',
      '551',
      '5510',
      '552',
      '5520',
      '553',
      '5530',
      '554',
      '5540',
      '559',
      '5590',
      '56',
      '561',
      '5610',
      '562',
      '5621',
      '5629',
      '563',
      '5630',
      '564',
      '5640',
      'J',
      '58',
      '581',
      '5811',
      '5812',
      '5813',
      '5819',
      '582',
      '5821',
      '5829',
      '59',
      '591',
      '5911',
      '5912',
      '5913',
      '5914',
      '592',
      '5920',
      '60',
      '601',
      '6010',
      '602',
      '6020',
      '603',
      '6031',
      '6039',
      'K',
      '61',
      '611',
      '6110',
      '612',
      '6120',
      '619',
      '6190',
      '62',
      '621',
      '6211',
      '6219',
      '622',
      '6220',
      '629',
      '6290',
      '63',
      '631',
      '6310',
      '639',
      '6390',
      'L',
      '64',
      '641',
      '6411',
      '6419',
      '642',
      '6421',
      '6422',
      '643',
      '6431',
      '6432',
      '6433',
      '649',
      '6491',
      '6492',
      '6493',
      '6494',
      '6495',
      '6499',
      '65',
      '651',
      '6511',
      '6512',
      '652',
      '6520',
      '653',
      '6530',
      '66',
      '661',
      '6611',
      '6612',
      '6619',
      '662',
      '6621',
      '6622',
      '6629',
      '663',
      '6630',
      'M',
      '68',
      '681',
      '6810',
      '682',
      '6821',
      '6829',
      'N',
      '69',
      '691',
      '6910',
      '692',
      '6920',
      '70',
      '701',
      '7010',
      '702',
      '7020',
      '71',
      '711',
      '7110',
      '712',
      '7120',
      '72',
      '721',
      '7210',
      '722',
      '7220',
      '73',
      '731',
      '7310',
      '732',
      '7320',
      '733',
      '7330',
      '74',
      '741',
      '7410',
      '742',
      '7420',
      '743',
      '7430',
      '749',
      '7491',
      '7499',
      '75',
      '750',
      '7500',
      'O',
      '77',
      '771',
      '7710',
      '772',
      '7721',
      '7729',
      '773',
      '7730',
      '774',
      '7740',
      '775',
      '7751',
      '7752',
      '78',
      '781',
      '7810',
      '782',
      '7820',
      '79',
      '791',
      '7911',
      '7912',
      '799',
      '7990',
      '80',
      '801',
      '8011',
      '8019',
      '81',
      '811',
      '8110',
      '812',
      '8121',
      '8129',
      '813',
      '8130',
      '82',
      '821',
      '8210',
      '822',
      '8220',
      '823',
      '8230',
      '824',
      '8240',
      '829',
      '8291',
      '8292',
      '8299',
      'P',
      '84',
      '841',
      '8411',
      '8412',
      '8413',
      '8414',
      '842',
      '8421',
      '8422',
      '8423',
      '843',
      '8430',
      'Q',
      '85',
      '851',
      '8510',
      '852',
      '8520',
      '853',
      '8531',
      '8532',
      '8533',
      '854',
      '8540',
      '855',
      '8551',
      '8552',
      '8553',
      '8559',
      '856',
      '8561',
      '8569',
      'R',
      '86',
      '861',
      '8610',
      '862',
      '8620',
      '869',
      '8691',
      '8699',
      '87',
      '871',
      '8710',
      '872',
      '8720',
      '873',
      '8730',
      '879',
      '8791',
      '8799',
      '88',
      '881',
      '8810',
      '889',
      '8890',
      'S',
      '90',
      '901',
      '9011',
      '9012',
      '9013',
      '902',
      '9020',
      '903',
      '9031',
      '9039',
      '91',
      '911',
      '9111',
      '9112',
      '912',
      '9121',
      '9122',
      '913',
      '9130',
      '914',
      '9141',
      '9142',
      '92',
      '920',
      '9200',
      '93',
      '931',
      '9311',
      '9312',
      '9319',
      '932',
      '9321',
      '9329',
      'T',
      '94',
      '941',
      '9411',
      '9412',
      '942',
      '9420',
      '949',
      '9491',
      '9492',
      '9499',
      '95',
      '951',
      '9510',
      '952',
      '9521',
      '9522',
      '9523',
      '9524',
      '9529',
      '953',
      '9531',
      '9532',
      '954',
      '9540',
      '96',
      '961',
      '9610',
      '962',
      '9621',
      '9622',
      '9623',
      '963',
      '9630',
      '964',
      '9640',
      '969',
      '9690',
      'U',
      '97',
      '970',
      '9700',
      '98',
      '981',
      '9810',
      '982',
      '9820',
      'V',
      '99',
      '990',
      '9900',
    ],
  },
);

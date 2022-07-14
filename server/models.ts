import { Schema, model, connect } from 'mongoose';
import {Meal,Product} from './interface' 
import conn from './.config'
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    return keys.reduce((o, k) => (o[k] = obj[k], o), {} as Pick<T, K>);
  }
const productKeys:string[] = [
    '_id',
    '_keywords',
    'allergens',
    'allergens_from_ingredients',
    'allergens_from_user',
    'allergens_hierarchy',
    'allergens_tags',
    'amino_acids_prev_tags',
    'amino_acids_tags',
    'brands',
    'brands_tags',
    'categories',
    'code',
    'compared_to_category',
    'complete',
    'completeness',
    'data_quality_info_tags',
    'data_quality_tags',
    'data_quality_warnings_tags',
    'data_sources_tags',
    'ecoscore_data',
    'food_groups',
    'food_groups_tags',
    'fruits-vegetables-nuts_100g_estimate',
    'generic_name',
    'id',
    'ingredients',
    'ingredients_analysis',
    'ingredients_analysis_tags',
    'ingredients_from_or_that_may_be_from_palm_oil_n',
    'ingredients_from_palm_oil_n',
    'ingredients_from_palm_oil_tags',
    'ingredients_hierarchy',
    'ingredients_n',
    'ingredients_n_tags',
    'ingredients_original_tags',
    'ingredients_percent_analysis',
    'ingredients_tags',
    'ingredients_text',
    'ingredients_that_may_be_from_palm_oil_n',
    'ingredients_that_may_be_from_palm_oil_tags',
    'ingredients_with_specified_percent_n',
    'ingredients_with_specified_percent_sum',
    'ingredients_with_unspecified_percent_n',
    'ingredients_with_unspecified_percent_sum',
    'interface_version_created',
    'interface_version_modified',
    'known_ingredients_n',
    'manufacturing_places',
    'minerals_prev_tags',
    'minerals_tags',
    'misc_tags',
    'no_nutrition_data',
    'nucleotides_tags',
    'nutrient_levels_tags',
    'nutriments',
    'nutrition_data',
    'nutrition_data_per',
    'nutrition_data_prepared',
    'nutrition_data_prepared_per',
    'nutrition_grades_tags',
    'nutrition_score_beverage',
    'other_nutritional_substances_tags',
    'product_name',
    'quantity',
    'serving_quantity',
    'serving_size',
    'unknown_ingredients_n',
    'unknown_nutrients_tags',
    'vitamins_tags',
]
const mealSchema = new Schema<Meal>({
    code: { type: String, required: true },
    product: { type: {} as Product, required: true },
    time_stamp: Date
  });

const mealModel = model<Meal>('Meal',mealSchema)

export default async function importMeal(data:any){
    const product:Product= pick(data.product,...productKeys) as Product
    const meal:Meal= {
        code:data.code,
        product,
        time_stamp:new Date()
    }as Meal;


    const m = new mealModel(meal)
    await m.save()
    console.log(meal)

}

const connDb = () => {
    return connect(conn);
  };
  export { connDb };
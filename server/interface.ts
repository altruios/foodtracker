
    export interface AggregatedOrigin {
        origin: string;
        percent: number;
    }

    export interface OriginsOfIngredients {
        aggregated_origins: AggregatedOrigin[];
        epi_score: number;
        epi_value: number;
        origins_from_origins_field: string[];
        warning: string;
    }

    export interface Packaging2 {
        ecoscore_material_score: number;
        ecoscore_shape_ratio: number;
        material: string;
        shape: string;
    }

    export interface Packaging {
        non_recyclable_and_non_biodegradable_materials: number;
        packagings: Packaging2[];
        score: number;
        value: number;
        warning: string;
    }

    export interface ProductionSystem {
        labels: any[];
        value: number;
        warning: string;
    }


    export interface Adjustments {
        origins_of_ingredients: OriginsOfIngredients;
        packaging: Packaging;
        production_system: ProductionSystem;
    }

    export interface Agribalyse {
        warning: string;
    }

    export interface EcoscoreData {
        adjustments: Adjustments;
        agribalyse: Agribalyse;
        ecoscore_grade: string;
        ecoscore_tags: string[];
    }

    export interface Ingredient {
        has_sub_ingredients: string;
        id: string;
        percent_estimate: number;
        percent_max: number;
        percent_min: number;
        rank: number;
        text: string;
        vegan: string;
        vegetarian: string;
        from_palm_oil: string;
    }

    export interface IngredientsAnalysis {
        'en:may-contain-palm-oil': string[];
        'en:non-vegan': string[];
        'en:vegan-status-unknown': string[];
        'en:vegetarian-status-unknown': string[];
    }


    export interface Nutriments {
        calcium: number;
        calcium_100g: number;
        calcium_label: string;
        calcium_unit: string;
        calcium_value: number;
        carbohydrates: number;
        carbohydrates_100g: number;
        carbohydrates_unit: string;
        carbohydrates_value: number;
        energy: number;
        'energy-kcal': number;
        'energy-kcal_100g': number;
        'energy-kcal_unit': string;
        'energy-kcal_value': number;
        energy_100g: number;
        energy_unit: string;
        energy_value: number;
        fat: number;
        fat_100g: number;
        fat_unit: string;
        fat_value: number;
        fiber: number;
        fiber_100g: number;
        fiber_unit: string;
        fiber_value: number;
        'fruits-vegetables-nuts-estimate-from-ingredients_100g': number;
        'fruits-vegetables-nuts-estimate-from-ingredients_serving': number;
        iron: number;
        iron_100g: number;
        iron_label: string;
        iron_unit: string;
        iron_value: number;
        'nova-group': number;
        'nova-group_100g': number;
        'nova-group_serving': number;
        potassium: number;
        potassium_100g: number;
        potassium_label: string;
        potassium_unit: string;
        potassium_value: number;
        proteins: number;
        proteins_100g: number;
        proteins_unit: string;
        proteins_value: number;
        salt: number;
        salt_100g: number;
        salt_unit: string;
        salt_value: number;
        'saturated-fat': number;
        'saturated-fat_100g': number;
        'saturated-fat_unit': string;
        'saturated-fat_value': number;
        sodium: number;
        sodium_100g: number;
        sodium_unit: string;
        sodium_value: number;
        sugars: number;
        sugars_100g: number;
        sugars_unit: string;
        sugars_value: number;
    }

    export interface Product {
        _id: string;
        _keywords: string[];
        allergens: string;
        allergens_from_ingredients: string;
        allergens_from_user: string;
        allergens_hierarchy: string[];
        allergens_tags: string[];
        amino_acids_prev_tags: any[];
        amino_acids_tags: any[];
        brands: string;
        brands_tags: string[];
        categories: string;
        code: string;
        compared_to_category: string;
        complete: number;
        completeness: number;
        data_quality_info_tags: string[];
        data_quality_tags: string[];
        data_quality_warnings_tags: string[];
        data_sources_tags: string[];
        ecoscore_data: EcoscoreData;
        food_groups: string;
        food_groups_tags: string[];
        'fruits-vegetables-nuts_100g_estimate': number;
        generic_name: string;
        id: string;
        ingredients: Ingredient[];
        ingredients_analysis: IngredientsAnalysis;
        ingredients_analysis_tags: string[];
        ingredients_from_or_that_may_be_from_palm_oil_n: number;
        ingredients_from_palm_oil_n: number;
        ingredients_from_palm_oil_tags: any[];
        ingredients_hierarchy: string[];
        ingredients_n: number;
        ingredients_n_tags: string[];
        ingredients_original_tags: string[];
        ingredients_percent_analysis: number;
        ingredients_tags: string[];
        ingredients_text: string;
        ingredients_that_may_be_from_palm_oil_n: number;
        ingredients_that_may_be_from_palm_oil_tags: any[];
        ingredients_with_specified_percent_n: number;
        ingredients_with_specified_percent_sum: number;
        ingredients_with_unspecified_percent_n: number;
        ingredients_with_unspecified_percent_sum: number;
        interface_version_created: string;
        interface_version_modified: string;
        known_ingredients_n: number;
        manufacturing_places: string;
        minerals_prev_tags: string[];
        minerals_tags: string[];
        misc_tags: string[];
        no_nutrition_data: string;
        nucleotides_tags: any[];
        nutrient_levels_tags: any[];
        nutriments: Nutriments;
        nutrition_data: string;
        nutrition_data_per: string;
        nutrition_data_prepared: string;
        nutrition_data_prepared_per: string;
        nutrition_grades_tags: string[];
        nutrition_score_beverage: number;
        other_nutritional_substances_tags: any[];
        product_name: string;
        quantity: string;
        serving_quantity: string;
        serving_size: string;
        unknown_ingredients_n: number;
        unknown_nutrients_tags: any[];
        vitamins_tags: string[];
    }
    export interface Meal{

        code:string ;
        product:Product;
        time_stamp:Date;
    }



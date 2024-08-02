export function variantselect(variants){
    const values = variants.edges.flatMap(e => e.node.selectedOptions);
   
    const uniqueOptions = new Set();
  // Flatten and deduplicate variant options
    const flattened = values.reduce((acc, { name, value }) => {
      const key = `${name}-${value}`;
      if (!uniqueOptions.has(key)) {
        uniqueOptions.add(key);
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push(value);
      }
      return acc;
    }, {});
    const keys = Object.keys(flattened);
    // set first available variant
    const availableVariants = variants.edges.find(e =>e.node.product.availableForSale==true
    ); 

    return ({keys,availableVariants,flattened})
}

    // // handles click selection update
    export function handleseletor(setVariantSeleted,selectedOptions,value,key,variants){
       
      const newOptions=selectedOptions.map(e=>e.name==key?{...e,value}:e)
      
    // Define a function to check if the variant's selectedOptions match newOptions
    const matchesSelectedOptions = (variantOptions) => {
      return variantOptions.length === newOptions.length &&
        variantOptions.every(option =>
        newOptions.some(newOption => 
        newOption.name === option.name && newOption.value === option.value
      )
    );
    };
      const newVariants = variants.edges.filter(e => 
      matchesSelectedOptions(e.node.selectedOptions)
    );
    setVariantSeleted(newVariants[0].node);
    }
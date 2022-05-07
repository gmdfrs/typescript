export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                (Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any)
            );
        });
    });
}

// https://help.liferay.com/hc/en-us/articles/360031163631-Filter-Sort-and-Search
function sortingQueryBuiler(sortingParams:Array<[string, string]>):string[] {
    return sortingParams.map(sortingKey => `sort=${ sortingKey[0] }:${ sortingKey[1] }`);
}

function filteringQueryBuiler(filteringParams:Array<[string, string[]]>):string[] {
    return filteringParams.map(filteringKey => {
        const isMonoFilter = filteringKey[1].length === 1;

        return isMonoFilter
            ? [`filter=${ filteringKey[0] }  ${ filteringKey[1] }`]
            : [`filter=${ filteringKey[0] } ${ filteringKey[1].join(' ') }`]
    }).reduce((flattened, arr) => flattened.concat(arr), []);
}

export function queryParamsStringifier(params:any):string {
    
    // Uppler params custom stringifier
    const paramsPreQueryString:string[] = Object.keys(params)
        .map(key => {
            // pre format property value pairs depending on use case
            switch(true) {
                case key === 'sort': return sortingQueryBuiler(params[key]);
                case key === 'filter': return filteringQueryBuiler(params[key]);
                default: return [`${ key }=${ params[key] }`];
            }
        })
        .reduce((flattened, arr) => flattened.concat(arr), []);

        console.log("je suis function params" + `?${ paramsPreQueryString.join('&') }`);
    // concat and stringify query string
    return `?${ paramsPreQueryString.join('&') }`;
}





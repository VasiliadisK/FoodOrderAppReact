export async function FetchProductData()
{
    const response = await fetch("/api/meals");
    const data = await response.json();
    if(!response.ok)
    {
        throw new Error('Failed to fetch products');
    }    
    return data;
}
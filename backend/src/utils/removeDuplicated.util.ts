export const removeDuplicate = (duplicatePost:any[], field:string)=>{
    const post =  duplicatePost.filter((cur:any,idx:number,arr:any[])=>arr.findIndex((curTwo:any)=>(curTwo[field]===cur[field]))===idx)
    return post ;
  }
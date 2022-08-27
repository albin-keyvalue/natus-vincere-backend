const db = require('../db/index.js');

module.exports.getTopRecommendation = getTopRecommendation
module.exports.getBottomRecommendation = getBottomRecommendation
module.exports.getShoeRecommendation = getShoeRecommendation

const TOP = 'top';
const BOTTOM = 'bottom';
const SHOES = 'shoes';

async function getTopRecommendation(color, gender) {
    const recommendedColors = await getColors(TOP, color)
    console.log(recommendedColors)
    const combo = []
    for (let i = 0; i < recommendedColors.length; i++) {
        const bottom = await getItem(recommendedColors[i].bottom, gender, BOTTOM, i)
        const shoe = await getItem(recommendedColors[i].shoes, gender, SHOES, i)
        const accessory = await getAccessory(gender, i)
        console.log(recommendedColors[i].bottom + bottom + recommendedColors[i].shoes + shoe)
        combo.push({
            id: i,
            combination: [bottom, shoe, accessory]
        })
        console.log({
            id: i,
            combination: [bottom, shoe, accessory]
        })      
    }
    return combo
}

async function getBottomRecommendation(color, gender) {
    const recommendedColors = await getColors(BOTTOM, color)
    console.log(recommendedColors)
    const combo = []
    for (let i = 0; i < recommendedColors.length; i++) {
        const top = await getItem(recommendedColors[i].bottom, gender, TOP, i)
        const shoe = await getItem(recommendedColors[i].shoes, gender, SHOE, i)
        const accessory = await getAccessory(gender, i)
        console.log(recommendedColors[i].top + top + recommendedColors[i].shoes + shoe)
        combo.push({
            id: i,
            combination: [top, shoe, accessory]
        })
        console.log({
            id: i,
            combination: [top, shoe, accessory]
        })
    }
    return combo
}

async function getShoeRecommendation(color, gender) {
    const recommendedColors = await getColors(SHOES, color)
    console.log(recommendedColors)
    const combo = []
    for (let i = 0; i < recommendedColors.length; i++) {
        const top = await getItem(recommendedColors[i].top, gender, TOP, i)
        const bottom = await getItem(recommendedColors[i].bottom, gender, BOTTOM, i)
        const accessory = await getAccessory(gender, i)
        console.log(recommendedColors[i].bottom + top + recommendedColors[i].bottom + bottom)
        combo.push({
            id: i,
            combination: [top, bottom, accessory]
        })
        console.log({
            id: i,
            combination: [top, bottom, accessory]
        }) 
    }
    return combo
}

async function getItem(color, gender, type, offset) {
    const res = await db.query(`select * from public.item i where i.color = $1 and gender = $2 and "type" = $3 limit 1 offset $4;`, [color, gender, type, offset])
    return res.rows[0]
}

async function getAccessory(gender, offset) {
    const res = await db.query(`select * from public.item i where gender = $1 and "type" = 'accessory' limit 1 offset $2;`, [gender, offset])
    return res.rows[0]
}

async function getColors(type, color) {
    const res = await db.query(`select * from color_combo where `+ type +` = $1 `, [color])
    return res.rows
}
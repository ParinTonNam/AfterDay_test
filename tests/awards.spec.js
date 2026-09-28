import {test, expect} from '@playwright/test';

test('awards render as selectable content and individual interactive photos', async ({page}) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/#certificate');
  await page.evaluate(()=>document.fonts.ready);
  const awards=page.locator('#certificate');
  await expect(awards.getByRole('heading',{name:'CDVE 2025',exact:true})).toBeVisible();
  await expect(awards.getByRole('heading',{name:'The 16th NAPROCK PROCON 2024'})).toBeVisible();
  await expect(awards.getByText(/AfterDay Horizon was also accepted/)).toBeVisible();
  await expect(awards.locator('.award-photo')).toHaveCount(7);
  await awards.screenshot({path:'artifacts/awards-desktop.png'});
  const opener=awards.getByRole('button',{name:'Enlarge CDVE 2025 conference',exact:true});
  await opener.click();
  const dialog=page.getByRole('dialog',{name:'Project awards photo viewer'});
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('1 / 7')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByText('2 / 7')).toBeVisible();
  await dialog.getByRole('button',{name:'Previous award photo'}).click();
  await expect(dialog.getByText('1 / 7')).toBeVisible();
  await dialog.getByRole('button',{name:'Previous award photo'}).click();
  await expect(dialog.getByText('7 / 7')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
});

test('award cards reflow on mobile and enlarged portrait fits the viewport',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#certificate');await page.evaluate(()=>document.fonts.ready);
  await page.locator('#certificate').screenshot({path:'artifacts/awards-mobile.png'});
  await page.getByRole('button',{name:'Enlarge NAPROCK PROCON 2024 — Special Prize certificate',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Project awards photo viewer'});
  await expect(dialog).toBeVisible();
  const box=await dialog.boundingBox();
  expect(box.width).toBeLessThanOrEqual(390);expect(box.height).toBeLessThanOrEqual(844);
  await page.screenshot({path:'artifacts/award-photo-mobile.png'});
  await dialog.getByRole('button',{name:'Close award photo'}).click();await expect(dialog).toBeHidden();
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
    const clipped=await page.locator('.award-content').evaluateAll(els=>els.some(el=>el.scrollWidth>el.clientWidth));
    expect(clipped).toBe(false);
  }
});

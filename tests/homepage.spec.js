import {test, expect} from '@playwright/test';
test('desktop Homepage assets, layout and interactions', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('heading',{name:'A Cross-Platform Co-op Game for Communication and Strategic Skills'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(1440);
  await expect.poll(() => page.locator('img').evaluateAll(imgs=>imgs.filter(img=>!img.complete || img.naturalWidth===0).map(img=>img.src))).toEqual([]);
  await page.screenshot({path:'artifacts/homepage-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'Select language'}).click();
  await expect(page.getByRole('button',{name:'English',exact:true})).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'English',exact:true})).toBeHidden();
  await page.getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/#about$/);
  await page.getByRole('button',{name:'Enlarge how to play diagram'}).click();await expect(page.locator('dialog.lightbox')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.locator('dialog.lightbox')).toBeHidden();
  const before=await page.locator('.gallery').first().locator('.gallery-image img').last().getAttribute('src');
  await page.getByRole('button',{name:'Next VR gameplay',exact:true}).click();
  expect(await page.locator('.gallery').first().locator('.gallery-image img').last().getAttribute('src')).not.toBe(before);
  await page.getByRole('link',{name:'Contact Us',exact:true}).click();await expect(page).toHaveURL(/#contact$/);
  expect(errors).toEqual([]);
});
test('mobile Homepage reflows and navigation works',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({path:'artifacts/homepage-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.getByRole('link',{name:'Design',exact:true}).click();await expect(page).toHaveURL(/#design$/);
  await expect(page.getByRole('button',{name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
  for(const width of [320,768,1024,1280]) {await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);}
});

test('background and primary sections span wide viewports',async({page})=>{
  for(const width of [1440,1920,2560]){
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    const boxes=await page.locator('#root,.header,main,main>section,footer').evaluateAll(els=>els.map(el=>{
      const rect=el.getBoundingClientRect();
      return {x:rect.x,right:rect.right,width:rect.width};
    }));
    for(const box of boxes){
      expect(Math.abs(box.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(box.right-width)).toBeLessThanOrEqual(1);
      expect(Math.abs(box.width-width)).toBeLessThanOrEqual(1);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);
  }
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(6, 8, 7)');
});

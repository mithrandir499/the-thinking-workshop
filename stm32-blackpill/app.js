(() => {
  const bitContainer = document.getElementById('bits');
  const toggle = document.getElementById('toggle-bit');
  const value = document.getElementById('odr-value');
  const bitStatus = document.getElementById('bit-status');
  const ledStatus = document.getElementById('led-status');
  let high = false;
  function draw() {
    bitContainer.replaceChildren();
    for(let n=31;n>=0;n--){
      const el=document.createElement('div');
      el.className='bit'+(n>15?' reserved':'')+(n===13?' target'+(high?' is-high':''):'');
      const label=document.createElement('span'); label.textContent=String(n);
      const digit=document.createElement('strong');digit.textContent=(n===13 && high)?'1':'0';
      el.append(label,digit);
      if(n===13)el.setAttribute('aria-label',`Bit 13: ${high?1:0}`);
      bitContainer.append(el);
    }
    value.textContent=high?'0x00002000':'0x00000000';
    bitStatus.textContent=`ODR13 = ${high?1:0}`;
    ledStatus.textContent=high?'PC13 HIGH · LED OFF (active-low)':'PC13 LOW · LED ON (active-low)';
  }
  toggle?.addEventListener('click',()=>{high=!high;draw();});
  draw();
  const copyBtn=document.querySelector('.copy-code');
  copyBtn?.addEventListener('click',async()=>{
    const content=`/* USER CODE BEGIN WHILE */\nwhile (1)\n{\n    HAL_GPIO_TogglePin(GPIOC, GPIO_PIN_13);\n    HAL_Delay(100);\n    /* USER CODE END WHILE */\n    /* USER CODE BEGIN 3 */\n}\n/* USER CODE END 3 */`;
    try{await navigator.clipboard.writeText(content);copyBtn.textContent='Copied ✓';}
    catch{copyBtn.textContent='Select text to copy';}
    setTimeout(()=>{copyBtn.textContent='Copy code ↗';},1800);
  });
})();

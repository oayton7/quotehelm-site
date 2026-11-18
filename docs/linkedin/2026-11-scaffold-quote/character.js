// Simple flat scaffolder character. Origin at the feet, about 230px tall at scale 1.
function scaffolder(pose){
  const skin='#E2A97E',vest='#F28C28',hat='#F4C430',trou='#2F3B45',strip='#E9EEF0';
  const arm=(x1,y1,x2,y2,x3,y3)=>`<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}" fill="none" stroke="${vest}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x3}" cy="${y3}" r="11" fill="${skin}"/>`;
  let arms='';let extra='';
  if(pose==='reach'){arms=arm(-34,-160,-48,-120,-50,-88)+arm(34,-160,58,-205,62,-250);}
  else if(pose==='phone'){arms=arm(-34,-160,-48,-120,-50,-88)+arm(34,-160,52,-120,22,-150);
    extra=`<rect x="6" y="-185" width="30" height="50" rx="6" fill="#12302B"/><rect x="10" y="-180" width="22" height="36" rx="3" fill="#9FE3C1"/>`;}
  else if(pose==='thumb'){arms=arm(-34,-160,-48,-120,-50,-88)+arm(34,-160,70,-150,76,-190)+`<rect x="70" y="-215" width="11" height="24" rx="5" fill="${skin}"/>`;}
  else {arms=arm(-34,-160,-46,-120,-48,-88)+arm(34,-160,46,-120,48,-88);}
  return `<g>
  <rect x="-30" y="-92" width="24" height="84" rx="6" fill="${trou}"/><rect x="6" y="-92" width="24" height="84" rx="6" fill="${trou}"/>
  <rect x="-36" y="-14" width="32" height="14" rx="5" fill="#1b1f22"/><rect x="4" y="-14" width="32" height="14" rx="5" fill="#1b1f22"/>
  <rect x="-40" y="-172" width="80" height="90" rx="16" fill="${vest}"/>
  <rect x="-40" y="-138" width="80" height="8" fill="${strip}"/><rect x="-40" y="-114" width="80" height="8" fill="${strip}"/>
  <rect x="-10" y="-172" width="20" height="90" fill="#3d4a55" opacity=".25"/>
  ${arms}
  <rect x="-8" y="-186" width="16" height="16" fill="${skin}"/>
  <circle cx="0" cy="-208" r="27" fill="${skin}"/>
  <circle cx="-9" cy="-208" r="3" fill="#1b1f22"/><circle cx="9" cy="-208" r="3" fill="#1b1f22"/>
  <path d="M-9 -195 Q0 -188 9 -195" fill="none" stroke="#1b1f22" stroke-width="3" stroke-linecap="round"/>
  <path d="M-30 -218 Q-30 -250 0 -252 Q30 -250 30 -218 Z" fill="${hat}"/><rect x="-36" y="-222" width="72" height="9" rx="4" fill="${hat}"/>
  <rect x="-4" y="-252" width="8" height="30" rx="3" fill="#e2b020"/>
  ${extra}</g>`;
}

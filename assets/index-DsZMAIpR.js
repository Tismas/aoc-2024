import{s as W}from"./showInConstructionMessage-BaL_f6fo.js";import{V as F}from"./AnimatedLabel-7xKXnh4f.js";import{g as D}from"./array-Bca9o1hS.js";import"./index-BtE0oQCh.js";const X=(U,R)=>{const V=R.split(`
`).map(L=>L.split("").map(Z=>({plant:Z,visited:!1}))),E=[];V.forEach((L,Z)=>{L.forEach((B,G)=>{B.visited||E.push(T(V,new F(G,Z)))})}),W(U,E.reduce((L,Z)=>L+Z.perimeter*Z.size,0))},T=(U,R,V=1,E=0)=>{const L=U.length,Z=U[0].length,B=U[R.y][R.x];B.visited=!0;for(const G of R.getAdjacent()){if(!G.isInBound(0,Z-1,0,L-1)){E++;continue}const M=U[G.y][G.x];if(M.plant===B.plant){if(M.visited)continue;const H=T(U,G);V+=H.size,E+=H.perimeter}else E++}return{size:V,perimeter:E,plant:B.plant}},n=(U,R)=>{const V=R.split(`
`).map(Z=>Z.split("").map(B=>({plant:B,visited:!1}))),E=[];V.forEach((Z,B)=>{Z.forEach((G,M)=>{G.visited||E.push(P(V,new F(M,B)))})});let L=0;for(const Z of E){const B=D(Z.plots,N=>N.y),G=D(Z.plots,N=>N.x),M=S(B,N=>N.x),H=S(G,N=>N.y),Q=K(M),I=K(H),Y=Q+I;L+=Z.size*Y}W(U,L)},P=(U,R,V=[R],E=1,L=0)=>{const Z=U.length,B=U[0].length,G=U[R.y][R.x];G.visited=!0;for(const M of R.getAdjacent()){if(!M.isInBound(0,B-1,0,Z-1)){L++;continue}const H=U[M.y][M.x];if(H.plant===G.plant){if(H.visited)continue;const Q=P(U,M);E+=Q.size,L+=Q.perimeter,V.push(...Q.plots)}else L++}return{size:E,perimeter:L,plots:V,plant:G.plant}},S=(U,R)=>{const V=[];return U.forEach((E,L)=>{const Z=new Array;for(const B of E.toSorted((G,M)=>R(G)-R(M))){const G=R(B),M=Z.find(H=>H.index===G&&H.side==="after");M?Z.splice(Z.indexOf(M),1):Z.push({index:G-1,side:"before"}),Z.push({index:G+1,side:"after"})}V[L]=Z}),V},K=U=>{let R=U[0].length;for(let V=1;V<U.length;V++){const E=U[V-1],L=U[V];for(const Z of L)E.find(G=>G.index===Z.index&&G.side===Z.side)||R++}return R},t=`UCCCCCHHHGGGGHHHPPPPPPPPDGGDDDDBKKKKKKKKKKKKKKKWWWWWWWWWGGGLLLLLLLLLZZZRTDDTTKIIIMIXXXXXAAAAAAAAAAARRRRRRRRUZUUUUUUTTTTTTTTTTTTYYRRRRRRRRRRR
UUUCCHQHHHHHHHPPPPPPPPPDDDDDDDDDKKKKKKKKKKKKKKWWWWWWWWWWWWWWLLLLLLLMZZTTTTTTTTIIIIIIIXXAAAAAAAAAAAAARRRRRRRUUUUUUUUTTTTTTTTTTTTTRRRRRRRRRRRR
UUUCCHHHHHHHHHPPPPPPPPPDDDDDDDDDKKKKKKKKKKKKKKWWWWWWWWWWWLWWLLLLLJJQQTBTTTTTTIIIIIIIIIIYAAAAAAAAAAAAARRRRUUUUUUUUUUTTTTTTTTTTTTTERRIRRRRRRRR
UUUCHHHHHHHHYHPPPPPPPPDDDDDDDDDDKKKKKKKKKKKWWWWWWWWWWWWWWLLLLLLLLLQQQTTTTTTTTIIIIIIIIIIAAAAAAAAAAAAAARRRRRUUUUUUUUTTTTTTTTTTTTTTEEEIIIRRRRRR
UUUUUHHHHHHHHPPPPPPFFPPDDDDDDDDDKKKKKKKKKKKWWWWWWWWWWWWWWLLLLLLQQQQQQQTTTTTTIIIIIIIIIIIIIIAIAAAAAAAAARRRUUUUUUUUUUTTBTTTTTTTTYTEEEEIIRRRRRRR
UUUUFHHHHHHHHHPPPFFFCDDDDDDDDDDDDDDPKKKKKKKKKKWIIWWQQWLLLLLLLLLQQQQQQQTTTTTTTTIIIIIIIIIIIIAIAAAAAAAAARRRUUUUQQQQUUTUUUTVTTTTTTEEEIIIIIIRRRRR
UUUUUHHHHHHHHPPPPFFFFDDDDDDDDDDDDDPPPKKKKKKKKHWHIIWWWWLLLLLLLLLQQQQQTQTTTTTTTTIIIIIIIIIIIIIIAAAAAAAARRRRUUBBQQUUUUUUUUUVTTYTYTTEEIIIIIIIRRRR
UUUUUHHHHHHHMPMPPFFFFDDDDDDDDTTTDDPPPPKKKKKKHHHHHHHWWQLLLLLLLLLQQQQQTTTTTTTTTTIIIIIIIIIIIIIIAAAAAAARRRNRRUUBQQQUUUUUUUUUTYYTYTTEEEIIIIIRRRRR
UUUUUHHHHHMMMMMMMNNFFCDDDDDDDDDTPIPPPPPPPPKKHHHHHHHHWQLLLLLLLLLQQGGQQQTTTTTTTTTIIIIIIIIIIIIIAAAAAAFNNNNNRRQQQQQQUUUUUUUUTYYYYIIEIEIIIIIRRRRR
UUUUHHHHHBMMMMQMMNNDDDDDDPDDDDDTPPPPPPPPPKKHHHHHHHHHWQZZZLLLLLLLGGGQQTTTTTTTTCCIICCCIIIIIIIIIKAAAAANNNNNNQQQQQQQUUUUUUUUYYYYIIIIIIIIIICCCRRR
UUMUUUHHHHMMMMQMMNNNDDDDPPPPPPPTPPPPPPPKKKHHHHHHHHHHZZZZZZZLLLLGGGGGGGTGTTTTTCCCCCCIIIIIILIIIKKAAZZNNNNBNNQQQQQQUUUUUUUUYYYYIIIIIIIIIICCCRRR
UKMUUMHHHHMMMMMMMMMNNPPPPRPPPPPPPPPPPPPPKKKHHHHHHHHHHZZZZLLLZLZGGGGGGGGGGGKTCCCCCCCIIIFFFKKKKKGHAZZZZNNNNNQQQQQQUUUUUUUUYYYYIIIDIIIIIICCRRRR
UUMUMMHHHMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPKKKHHHHHHHHHHHZZZZZLZZZZGGGGGGGGGGGGCCCCCCCIIIFFKKKQKKGGGGZZNNNNNNNQQQQQUUUUUUUUUUYYYIYYIICCCCCCCCCRR
AUMMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPKKKKHHHHHHHHHHZZZZZZZZZZZOOGGGGGGGGGGCCCCCCRRFFFFKKKKKKGGGGGGNNNNNNNQQQQUUUUUUUUUYYYYYYYYYCCCCCCCCCRRR
AAMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPPKKKKHHHHHHHHHHBBZZZZZZZZZZOOOOOGGRGGCCCCCRRRRFFFFFFKFGGGGGGGGNNNNNNNNQQQUUUUUUUUUYYYYYYYYYCCCCCCCCCRRR
MMMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPPKKKKKHHHHHHHHBBBBZBZZZZZZOOOOOUUURRRYCCCCRRRRRFFFFFKFFGGGGGGGNNNNNNNNNQQUUUUUUUYYYYYYYYYYCCCCCCCCCCCRR
FFMFFFMMMMMMMVVVPPPPPPPPPPPPPPPPPPPPPPKKKKHHHHHHHHHHBBBBBBZZZZZOOOOOUUURRRYYCCCRRRRRFFFFFFFGGGGGGNNNNNNNNNNNNNPPUUUUKKYYYYYYYYCCCCCCCCCCCRRR
FFFFFFFEEOMMMMVEFFFFPPPPPPPPPPPPVVPPPKKKKKHHHHHHHHBBBBBBJZZZZZZZOOOOUURRRYYGYCCRRRRRRFFFFFFFGGGGGGGNNNNNNNNNNPPPPPUKKKKYYYYYYYYCCCCCCCCCRRRR
FFFFFEEEEOMMDDEEFFFFFPPPPPPPPPVVVVPPPKKKKHHHHHHHHBBBBBBBBJZZZZZZOOOUURRYYYYYYYCCCRRRRRFFFFFFGGGGGGGNNNNNNNNNNNPPPPUKKKYYYYYYYYYCCCCCCCCCRRRR
FFFEEEEEEOOMEDEEFFFUFFFFPPPPPPVVVVPPPKKKKHHHHHBBBBBBBBBBBZZZZZUUUUUUURYYYYYYYYRRRRRRRFFFFFFFVGVGGGGGNNNNNNNNNKPPPPPPKKYYYYYYYYYCCCCCCCCCCCRR
FFEEEEEEEOOEEEEEFFFFFFFFPPPPIVVVVVVKKKKKKKHHHHHHHBBBBBBBBZZZUUUUUUUUUUAYYYYYYYYRRRRRRRFFFFFFVVVVGGGGGNNGNVNKNKKKPPPKKKKYYYYYYYCCCCCCCCCCRRRR
FFEEEEEEEEEEEEEEFFFFFFFFPPVVVVVVRVVKKKKKHHHHHHHBGBBBBBBBBBBUUUUUUUUUUUAAADDMMDORRRRRRRRFFFFFVVVVVVVGGGNGNVVKKKKKKKPPPEYYYYYYYYYCCCCCCRRRRRRR
FFEEEEEEEEEEEEEFFFFFFFFFVVVVVVVVVVVVKKKKHHHHHHHBBBBBBBBBBBBBUUUUUUUUUNUAUUDDDDDRRRRRRRRFFFFVVVVVVVVGGGNGKKKKKKKKEEEEEEEFYYYYYYCCCCCCCRRRRRRR
FFFFFFEEEEEEEEFFFFFFFFFFMVVVVVVVVVVGPPPKKKKKHHHEBBBBBBBBBBBBUUUUUUUUUUUUUDDDDDXXRARRRRRRFFFVVVVVVVCCCGNGGGGGKKKEEEEEEEEEYYEYYYHHCNCNNDDDDDDR
FFFFFFEEEEEEEFFFFFFFFFFFFVVVVVVVVVVVPPPPKQKHHHRBBBBBBBBBBBNUUUUUUUUUUUUUUUDDDDAXAADRRRRRFFFVVVVVVVCCCGGGGGTGKKEEEEEEEEEEEEEEHHHHNNNNNDDDDDRR
FFFFFEEEEEEEEFFFFFFFFFFFFVVVVVVVVVXXXXPPPQQRRHRBBBBBBBBBBBBBUUOUUUUUUDUDDDDDDAAAAADDRRRRRFFFVVVVVVVEEGGGGGTTTVVVEEEEEEEEEEGGGHHNFNNNNNNDOORO
FFFFFEEEEEEEEEEFFFFFFFFFFVVVVVVVVVXXXXQQQQQRRRRBBBBBBBBBBBBOUUOOOKUUDDDDDDDDDJAAAADDDRFFFFFVVVVVKVEEEEEEEGTTTVVEEEEEEEEEEEGGGNNNNNNNNNNNOOOO
FFTFFFEEEEETEEEEFFFFFFFFFVVVVVVVXXXXXQQQQQQRHHRRRRRRBBBOOBBOUOOOOKKKKDDDDDDDDDAAADDDDDDDDDDVVVVVKEEEEEEEITTTTTVEEEEEEEEEEGGGGGGNWNNNNNNOOOOO
TFTTTTEEEEEEEEEEFFFFFFFFFVVVVVVVXXXXQQQQQQQRRHHHHRRRRBOOBBOOUOOOOKKKKDDDDDDDDDDAADDDDDDDDDPVVIIVKEEEEEEEEETTTTTEEEEEEEEEEGGGGGGNNNNNDNNNOOOO
TTTTTTTETEEEEEEEFFFFFFFFCCVVVVVVXGGXQQQQQQQRHHHHHVVRRBOOOBOOOOOKKKKKKDDDDDDDDDDDDDDDDDDDDDDDIIIEEEEEEEEEEEETYTTTTYEEEEEEEGGGGGGCNNNNNNRRROOO
WTTTTTTTTTTTEWEMEFFFFFFFFVVGVVXXXGGXQQQQQQQHHHHHHVVVVVOOOOOOOOKKKKKJJDDDTDDDDDDDDDDDDDDDDDDIIIESEEEEEEEEEEEYYYYYYYYEEEEEEEGGGCCCCCNNNQRRROOO
TTTTTTTTTEEEEEEEEFFFFFFFHGGGVVGGGGGGHQQQQQQQHHHHCVVVVVOOOOOOZOZSKKKKKKDTTDDDDDDDDDDDDDDDDDDDIEEEEEEEEEEEEEEYYYYYYYYEEEEEEEGGGCCCCCCNRRRRROOO
TTTTTTTTTTTTEEEEFFFFFFFHHGGGGGGGGGGGHHQQQQQHHHHCCVVVYVVOOOOOZZZZHKKKKSSDDDDDDDDDDDDDDDDDDDDDDEEEYEEEEEEEEYYYYYYYYYYYYYECCCGGGCCYYYCCOORRROOO
ITTTTTTTTTTTEEEESFFHHHHHGGGGGGGGGGGGHHHQQQHHHHVVVVVVVVVVVOZOZZZHHHHKKSSDDDDDDDDDDDDDDDDDDDDDXEEYYYYYEEHHCCYYYYYYYYYYYYRRRRGGGCYYYYYYOOOROOOO
IITTTTTTTTTEEEEEEFFHPPPGGGGGGGGGGGGHHHHHHQHHHVVVVVVVVVVVVZZZZZZHHHHHKDDDDDDDDDDDDDDDDDDDDDDDDEYYYYYYYHHHCCYYYYYYYYYYYYRRRRGGGCYYYYYMMOOOOOOO
ITTTTTTTTTTTEEEEEFFPPPPPGGGGGGGGGGGHHHHHHHHHHHHVVVVVVVVVZZZZZZZHZZHHHDDDDDDDDDDDDDDDDDDDDDDDDDYYYYYYYHHHHHRYYYHHHYYYYYRRRRRCCCCYYYMMMMOOOOOO
IITTTTTTTTTTEEEEPPPPPPPPGGGGGGGGJJHHHHHHHHHHHHHVVVVVVVVVZZZZZZZHZZHHHDDDDDDDDDDDDDDDDDDDNDWWYYYYYYYYHHHHHHHYYYPPHHHYYYRRRRRRRRRYYYYMMMOOOOOO
ITTTTTTTTTTTTTPPPPPPPPPGGGGGGGGJJJJHHHHHHHHHHHHVVVVVVVVVVZZZZZZZZHHHHHHHDDDDDDDDDDDDDDDDDWWWWYYYYHYHPHHHHHYYYYHHHYYYYYRRRRRRRRRYYYYMMMMOOOOO
IITTTTTTTTTTTPPPPPPPPPDGGGGGGGGJJJJHHHHHHHBBBHVVVVVVVVVVZZZZZZZZZZHHHHWDDDDDDDDDDDDWWWWWWWWWWWYYYHHHHHHHHHHHXXHHHYYYYYRRRRRRRRRYYYNNNMNNNNNO
IITTTTTTTTTTTTPPPPPPPPPLGGGGGGJJJJJJHHHHHHBBBBAVVVVVVVVVZZZZZZZZZHHHWWWWDUCDDDDDDDDXXWWWZWZZZZZYHHHHHHHHHHHHHHHHHYYYYYRRRRRRRRRYYDNNNNNNNNOO
IIITTTTTTTTTTTKPPQPPLLLLGGGBJJJJJJJJJHHHHBBBBFBVVVVVVZZVZZZZZZZZZHHHWWWWICCDDDDGGGXXXXWZZZZZZZZYHHHHHHHHHHHHHHHHHYYYYYRRRRRRRRRRRRRRNNNNNGGO
GGGGTTTTLTTTTTKQPQQPPLLLHHGHHJJJJJJJJJHHBBBBBBBBBVVVVZZZZZZZZZZZZWWWWWWWWWCCCCGGXXSXXXZZZZZZZZZZHHHHHHHHHHHHHHHHHHYYYYRRRRRRRRRRRRRRNNNNUUGG
GGGGLLLLLLTTQQQQQQQQLLLLHHHHHJJJJJJJJJJUUSBBBBBBBVVVVZZZZZZZZZZZWWWWWWWWWCCCCGGGXXXXXXXZZZZZZZZZHQQQQHHHHHHHHHHHHYYYYYRRRRRRRRRRRRRRNNNNNNNG
LGLLLLLLLLTDQQQQQQQLLLLHHHHHHJJJJJJJUUUUUUUUBBBBBBBZZZZZZZZZDZZZWWWWWWWWCCCCCCGGXXXXXXXXXZZZZZZZZQQQQQHHHHHHHHEEHYYYYAARRRRRRRRRRRRRNNNNNGGG
LLLLLLLLLLLQCQQQQQQLLLLHHHHHHJJJJJJJUUUUUOUUUBBBBBBZZZZZUDDDDWWWWWWWWWWWCCCCCGGGXXXXXXXXMMMMMMQQQQQQQQQHHHHHHHHHWYYYFFARRRRRRRRRRRRRNNNGGGGG
LLLLDRLLLQQQQQQQQQLLLLHHHHHHHJJJRRJJUUUUUUUUUUBBBBBBBZZVDDDDDRWWWWWWWWWWCCCCCGGGVVVXXXXXMMMMMMQQQQQQQQQHHHHHHHHHHFFFFAARRRRRRRRRRRRRNNGGGGGG
LLLLRRRLLLQQQQQQQQQQLLHHHHHHHHHJRJJJUUUUUUUUUUUBBBBBBGZVDDDDWWWWWWWWWWWWCCCCGGVGVVVVXXXXMMMMMMMMMMQQQQQHQQHHHHHHHXFFFFARRRRRRRRRRRRRPNGXLGGG
SRLRRRLLLLLQQQQQQQQLLLHHHHHHHHHHRRJJJUUUUUUUUUUBBBBBBBBDDDDDWWWWWWWDWWWHCCCCGGVVVVVVVXXXMMMMMMMMMMQQQQQMQUHWHHHXXXXXRRRRRRRRRRRRRNNNNNLLLLLG
SRRRLLLLLLLQQQQQQQQCCHHHHHHHHHHHHJJUUUUUUUUUUUBBBBBBBBDDDDDDWDDWDDDDDWWDFFFGGGVVVVVVVXXXMMMMMMMMMMQQQQQQQXGXXXXXXXXXRRRRRRRRRRRRRNNNNNLUULLG
SRRLLLLNLQQQQQQQQCCCCCHHHHHHHHHHQUUUUUUUUUUUUUBBBBBBWWDDDDDDDDDDDGDDDWDDFFGGGGVVVVVVXXXXMMMMMMMMMMQQQFQQQXXXXXXXXXXFRRRRRRRRRRRRRNNNLLLLLLLL
SLLLLLLNLQQQQQQQQQQCCHHHHHHHPHHHHUUUUUUUUUUUUUBBBBBBBWWWDDDDGDGGDGDDDDDDDDQQGGKVVVVVXMMMMMMMMMMMMMQQQQQQQQQXXXXXXXXFRRRRRRRRRRROOOJNLLLLLLLL
SNLLLLLNNQQQQQQQQQQCHHHHHHHHHHHHCUUUUUUUUUUUUZBBBBBBWWWWWWDDGDTGGGGGDDDDDDQQGGGPPGVVVMMMMMMMMMMMMMQQQQQQQQXXXXXXXXFFRRRRRRRRRROOOOJJLLLLLLLL
SNNNNNNNNSQQBQQQQQQXHHHHHHBHHBBBUUUUUUUUUUUUZZZZBBWWWWWWWWWWGGGGGGGGDDDDDDQQQGGGGGGCMMMMMMMMMMMMMMZZQQQQQQXXXXXXXXXERRRRRRRRRRRRROJFFBLLLLLL
GKNNRNNNNNNBBQQQQQXXHHHHHHBBBBBBBBUUUUUUUPPPZZZZBBBWWWWWWWWWWGGGGGGYGDDQDQQQGGGGGGGGMMMMMMMMMMMMMMQQQQQQQQQXXXXXXXEERRRRRRRRRRRRRFFFFFLLLLLL
GNNNNNNNNNBBBQQQQBBXHHFFBBBBBBBBBBBBUUUUUPPPPPPPBBBBWWWWWWWWWGGGGGGGGDDQQQQGGGGGGGGGMMMMMMMMMMMMMMQQQQQQQQQXXXXXXXEERRRRRRRRRRRRRFFFFLLLLLLL
GNNNNNNNNNBBBBQQBBBXXFFFBBBBBBBBBBBUUUUUPPPPPPPPBBBMMMWWWWWWWGGGGGGGDDDQQQQGGGGGGGGGMMMMMMMMMMMMMMQQQQQQQQQXXXXXQXEERRRRRRRRRRRRRFFFFXLLELLL
GGYNNNNNNNNBBBQBBBBBBFFFBBBBBBBBBBUUUUPPPPPPPPPPPBBWWWWWWWGWWGGGGGGGGGGGQQQGGGGGGGGCMMMMMMMMBBBZQQQQQQQQQQQQXXCXXXXERRRRRRRRRRRRRFFFFFEEELLL
GGYYNNNNNNNBBBBBBBBBFFFFFBBBFBBBBBBBUUPPPPPPPPPPPBBWWWWWWWGGGGGGGGGGGGGGGQQQQGGGGGGCMMMMMMMMBBBMMQQQQQQQQEEXXEEZEEEEEEEEEEEEFRRRRFFFFFEEEELL
GGGGNNNNNNNBBBBBBBBFFFFFFBFFFBBBBBBBBPPPPPPPPPPPPPBWWWWWWWWGGGGGGGGGGGGQQQQGGGGGGGSSMMMMMMMMBBBMMQQQQEEQEEEXEEEEEEEEEEEEEEEEERRRRFFFFEEEEEEL
GGGGNNNNNNNBBBBBBBBFFFFFFFFFBBBOOBBBBPPPPPPPPPPPPPPWWWWWWWWGGGGGGGGGGGGGQQQQQQQGGSSSMMMMMMMMBBBMMQQQQEEEEEEEEEEEEEEEEEEEEEEEERRRRFFFFEEEEEEE
GGGGGNNNGGBBBBBBBBBFFFFFFFFFFOOOBBBOPPPPPPPPPPPPPWWWWWWWWWWWWGGGGGGGGGGQQQQSQSQSSSSSMMMMMMMMBBBQQQQQQQEEEEEEEEEEEEEEEEEEEEEEERRRRFFFEEEEEEEP
GGGGGGGGGGGGBBBBBBBBFFFFFFFFFFOOOOOPPPPPPPPPPPPPAAAAWWWWWWWWWWWWGGGGGGQQQQQSSSSSSSSSSMMMMMMMBBBQQQQQQEEEEEEEEEEEEEEEEEEEYEEEERRRREEEEEEEEECI
GGGGGGGGGGGGBBBBBBBBFFFFFFFFOOOOOOOPPPPPPPPPPPPAAAAAWWWWWWWWWWWWGWGGQQQQQQQQSSSSSSSSSMMMMMMMBBBUUQQQEEEEEEEEEEEEEEEEEEEEYBEEEEEEEEEFEEEERIII
GGGGGGGGGGGGBBBBBBBBBBFFFFFFOEOOOOOPPPPPPPPPPPPAAAAAWWWWWWWWWWWWWWGGGGQQQQQSSSSSSSSSSSSMBBBSBBBUUUUQEEEEEEEEEEEEEBBBEEEEEBEJEGGEEEEFFEEERIII
GGGGGGGGGGGGBBBBBBBBBBBBBFFFFEEOOOOPPPPPPPPPPPWAAAAAAWWWWWWWWWWWWWWUGGQQQQQSSSSSSSSUUUYBBBBUBBBUUUUUNEUUEEEEEEEEEBBBVEBEBBBJJJGEEEGFFERRRIII
GGGGGGGGGGGGGGBBBBBBBBOOOFFFIOOOOOOPPPPPPPPPPWWWWAATTTWWWWWWWWWWWWWWQQQQQQQQSQSSSSUUUUYTBBBBBBBUUUUUUUUZEEEEEEEEEBBBBEBBBBBJJJGEEGGFFERRRIII
GGGGGGGGGGGGGBBBBBBBBBBOOBOOOOOOOOOPPPPPPOKKHKKKHHHTHTTZZWWWWWWWWWWQQOQQQQQQQQQQSQUUUUYYBBBBUUUUUUUUZZZZEEEEEEEEEEEBBBBBBBBGGGGGGGGGGERRRIII
GGGGGGGGGGGGGBBBBBBBBBBBOOOOOOOOOOOPPPPPPKKKKKKKHHHHHHHBZZZZWWWEWWOOOOOQQQQQQQQQQQUYYYYYBBBBUUUUUUUUUZZZEEEEEEEEEEEEBBBBGGPGGGGGGGGGDERRRIII
GGGGGGGGGGGXXBBBBBBBBBBBOOOOOOOOOOOPPPPPPKKKKKKHHHHHHHZZZZFWWWWWWWOOOQQQQQQQQUUUUUUFYYYYYYYUUUUUUUUUZZZZEEEEEEIEBBBBBBBBBGGGGGGGGGGGGRRRRIII
GGGGGGGGGGXXXBBBBBBBBBBBBOOOOOOOOOOPPPPPPKKKKKHHHHHHHHHHZZZWWWWWWOOOQQQQQQQQQUUUUUUUYYYYYYYYYGUUUUZZZZZZZZEMMMEEBBBBBBBBBGGGGGGGGGGGGRRRRIRR
GGGGGGGGGGXGGBBBBBBBBBBBOOOWOOOOOOOOKKKKKKKKKKHHHHHHHHHHMMMWWMWWOOOOOQQQQQQQQQUUUUUUZZZYYYYYYZUZZZZZDZZDDDMMMMMMBBBBBBBBBGGGGGGGGGGGGGRGRRRR
GGGGAAGGGGGGGGBBBBBBBBBBOOWWOOOOOOOOOOKKKKKKKKKKHHHHHHHHMMMMWMWWWOOOOOQQQQQQUUUUUUZZZZZZZYYZZZZZZZZZDDDDDMMMMMBBBBBBBBBBBKGGGGGGGGGGGGGGGRRR
GGGGGGGGGGGGGBBBBBBBBBBBWWWWOOOOOUOOKKKKKKKKKKKHHHHHHHHHMMMMWMMMOOOOOOOOOQUUUUUUUUUZZZZZZZZZZZZZZZZZDDDDDMMMSSSSBSBBBBBBKKKKGGGGGGGGGGGGGRRR
GGGGGGGGGGGGGGBBBBBBBBBBBBWWWUUUOUOVVUUUKKKKKKHHHHHHHHHHHMMMMMMMOOOOOOOOOQUUUUUUUUUUUEZZZZZZZZZZZZDDDDDDDDMSSSSSSSBBBBBBKKKKGGGGGGGFFFGGGRRR
GGGGGGGGGGGGGGBBBBBBBBBBBBPWWPPUUUUUUUUUKKKKKKKKHHHHHHHQMMMMMMMMMMMMLOLLOONUUUUUUUUUUEZZZZZZZZZZZDDDDDDDDDMSSSSSSSBBBKBKKKKKKKGGGGGFFFGGGGRR
GGGGGGGGGGGGGGBBBBBBBBBBBBPPPPPUUUUUUUUUKKKKKKKKKHHQPPPQMMMMMMMMMMMLLLLLNNNNUUUUUUUUUEZZZZZZZZZZZZZDDDDDDDDSSSSSSSSXKKKKKKKKKKGGGGGFFFGGGGGR
GGGGGGGGGGGGGGBBBBBBBBBBBBPPPPPUUUUUUUUUKKKKKKKQKSQQPQPQQMMMMMMMMMMLLLNNNNNNNUUUUUUUUUZZZZZZZZZZZZYDDDDDDDSSSSSSSSSSSYYKKKKKKKKKGGGFFFGGRRRR
GGGGGGGGGGGGGBBBZBBBBBBPPPPPUPUUUUUUUUUUKKKKKKKQQQQQQQPQQMMMMZZZZMMLLLLNNNNNNUUUUUUSUUZZZZZZZZZZZZYYADDDANNSSSSSSSSJKYKKKKKKKKKKGGGFFFGGZRRR
GGGGGGGGGGGGGGBBZBBBBBBBUUPUUUUUUUUUUUUUUKKKKKKQQQQQQQQQQMZZZZZMMMZZLLZZZNNNUUUUUUUUUZZZZZZZZZZZZZZYAADAANNSSSSSSSSJKYYKKKKKKKKKZZZFFFQZZRRR
GGGGIGGGBBBBBBBBZZBBBBBBUUUUUUUUUUUVUVKKKKKKKKQQQQQQQQQQQQZZZZZZMZZZLLZZZNNUUUUUURDDUUZZZZZZZZZZZYYYYAAAANNNNSSSSSSSKKKKKKKKKKKZZZZFFFFFFFFR
GGGGGGGNNBBBBBBZZBBBBZBZZUUUUUUUUUVVVVKKKKKKKKQQQQQQQQQQQZZZZZZZZZZZZZZZZZNNUUDUUUDDZZZZZZZZZZZZZYYYYYAANNNNNNNNOSRRRKKKKKKKOKKKPZZFFFFFFFFR
GGNNNGGNNNNNBBZZZBBBBZZJZZZUUUUUUUUVVVVVKMMMKKQQQQQQQQTTQTTTZZZZZZZZZZZZZZZDDDDUUUDDDZZZZZZZBZZZZYYYYAANNNNNNNNNNRRRRKKKKYKKKKKPPZNFFFFFFFFR
NNNNNGNNNNNNBBBZZZBBBZZZZZZZUUUUUVVVVVVVVVMMKKQQQQQQQQTTTTTLLZZZZZZZZZZZMMMMLDDDDDDDDZYBBBBBBZZZZYYYYAANNNNNNNNRRRRRKKKKKKKKKKPPPZZFFFZZZZRR
NNNNNNNNNNNJBBZZZZZZZZZZZZUUUUUUUVVVVVVVVMMMMKUUQQQFFTTTTTTTTZZZZZZZZZZZMLLMLDDDDDDDDDBBBNBBBBZYYYYYYAAANNNNNNNNNNNNKKKKKKKKKKPPPZKZZZZZZRRR
NNNNNNNNNNNNBBZZZZZZZZZZZZUUUUUUUVVVVVVMVMMMMUUUUTTTTTTTTTTTTTZZZZZZZZBBLLLMLDDDDBDDBBBBBBBBBBBYYYYYYYYYNNNNNNNNGGGKKKKKKKKKPPPPPPZZZZZZZIRR
NNNNNNNNNNNQZZZZZZZZZZZZMUUUUUUUUVVVVVVVUMMMMMUUTTTTTTTTTTTTTZZZZZZZZZZBBLLLLDDDDBBBBBBBBBBBBBBYYYYYYYYYNNNNGGGGGGGKRKAAAKKPPSPPPPZZIZZIIIIR
NNNNNNNQQQQQQZZZZZZZZZZZMMUUUUUUUUVVVVVVUMMMMUUUTTTTTTTTTTTTTZZZZZZZZZZBBLLLLLDLDBBBBBBBBBBBBBBYVVVYYYYYNNNNGGGGGZGZRSSSSSSSSSPPPPPPZZIIIIII
NNNNNNNNQQOQJZZZZZZZZZMMMMMUUUUUUCVVVDDVUMMMUUUUTTTTTTTTTTTTTTZZZZZZZZZBBLLLLLLLVVVVBBBBBBBBBBVVVVVVYYYYVVGGGGGGGZZZZSSSSSSSSSSPPPPPZZIIIIID
NNNNNNNNNOOQJJJZZJZZZMMMMMMMUUUMUCCCSSSSSSSUUUUUTTTTTTTTTTTTTZZZZZZZZZZBLLLLLLLLVVVVBBBBBBBBBBVVVVVVVYYYVVVGGGGZZZZZZSSSSSSSSSSSSPPPPPIIIIII
NNNNNNNOOOAJJJJJJJJZZMMMMMMMMUMMUCCCSSSSSSSUUUUUTTTTTTTTTTTTTTTZZZZZZPZLLLLLLLLLVVVVVBBBBBBBBBBVVVVVVVVVVVVGGGGGGZZZSSZSSUSSSSSSSSSWWPIIIIII
NNNNNNNOOOJJJJJJJJJZZMMMMMMMMMMMUCCCSSSSSSSUUUUUTTTTTTTTTTTTTTTCZZZZZZLLLLLLKLLVVVVVVBBBBBBBBBVVVVVVVVVVVVVGGGGZZZZZSSZSQUSSSSSSSSWWWIIIIIII
NNNNNNNNOJJJJJJJJMMMMMMMMMMMMMMMMCOOSSSSSSSUUUUUUUUUTTTTWTTTTTTCCCZRCZAAALLLKVVVVVVVBBBBBBBBABVVVVVVVVVVVVGGGZZZZZZZSSZSZUSUHSSUSSSWWIIIIIII
NNNNNNNJJJJJJJJJJJJMMMMMMMMMMMMMOOOOSSSSSSSUUUUUUKUUTTTTTTTTTTTCCCCCCAAAAALKKKVVVVVVVVBBBBBBBVVVVVVVVVVVVVVVVZZZZZZZZZZZZUUUSSSSWWWWWWJJIIII
NNNNNNNNIJJJJJJJJJMMMMMMMMMMMMMMMMSSSSSSSSSUUKKKKKKUTTTZZTTTTTTTCCCCCCCAANNKKKVVVVVVVVVVBBBBVVVVVVVVVVVVVVVTVZZZZZZZZZZZUUUUWWSWWWWWWIWWWIWI
NNNNNNNIIJJJJJJJJJJMMMKMMMMMMMMMMMSSSSSSSSSUUUUKKKKKKZZZZZZCECTCCCCCCCLNNNNNNNNNVVVVVVVVVVBVVVVVVVVVVVVVVVVVVZZZZZZZZZZZUUUUWWWWWWWWWIWWWWWW
NNNNNNNIIJJJJJJJJJJMMMMMMMMMMMMMMMSSSSSSSSSLKUKKKKKKKZZZZZZCCCCCCCCCCCCDNNNNNNVVVVVVVVVVVVVVVVVVVVVVVVVVOOOVOOOZZZZZZZZUUUUUUWWWWWWWWWWWWWWW
NNNNNNIIIIJLJJJJJJMMMMMMMMMMMMMMMMSSSSSSSSSSSKKKKKKKKKZZZZZZCCCCCCCCCCCNNNNNNNVVVVVVVVVVVVVVVVVVVVVOOVVVOOOOOOOZZZZZZZUUUUUUUUUWWWWWWWWWWWWW
NNNNHHUIULLLJJJJJJMMMMMMMMMMMMMMMSSSSSSSSSSSSDKKKKKKKKZZZZZZZCCCCCCCCCCCNNNNVNVVVVVVVVVVVVVVZVOOOOOOVVVVOOOOOOOZZZZUUUUUUUUUUUUUWWWWWWWWWWWW
NNNUUUUUULLLLJJJJJMMMMMMMMMMMMMMMMSSSSSSSSSSSKKKKKKKKKKZZZZWWWCCCCCCCCCCCDNVVVVXXVVVVVVVVVIIIIOOOOOOVVVDOOOOOOOZZZZUUUUUUUUUUNNNNNNWWWWWWWWW
LLLUUUUULLLLJJJJMMMMMMMMMZZZZMMMZMSSSSSSSSSSSLKKKKKYKKZZZZZWWWWCCCCCCCCCEDVVVVVXXIIIVVVVVVZIIIOOOOOOVVVOOOOOOOOOOOOUUUUUUUUUUUNNNNNWWMWWWWWW
LLJUUUUULLLLLLJJJJMMMMMMMMZZZZZZZZSSSSSSLLLLLLLLKKAKKKKWZWWWWWWCCCCCCCCEEEEVVVVXXVIIIVVVIVIIIIIOOOOOVVOOOOOOOOOOOOOOUUUUUUUUUNNNNNWWWWWWWWWW
LLLLULUULLLLLLLZZZMMMEMMMOZZZZZZZZSSSSSLLLLLLLLLLKKCKKWWWWWWWWWWWWCCEEEEEEVVVVXXXVIIIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOUUUUUUUUNNNNNNNNWWWWWWWW
LLLLULLLLLLLLLLLZEEMMEEMOOZZZZZZZZSSSSSLLLLLLLLCCCCCCKWWWWWWWWWWEEEEEEEEENNVZVJXXXIIIIIIIIIIIIIIIOOOOOOOOOOOOOOYYOOUUUUUUUUUNNNNNNNNWWWWWWWW
LLLLLLLLLLLLLLLLZEEEEEEMOOZZZZZZZZZSSSSLLLLLLLLLLCCCKKWWWWWWWWWWEEEEEEEEENNXXXXXXXIIIIIIIIIIIIIIIOOOOOOOOOOOOYYYYUUUUUYYUUUUUUNNNNNZZWWWWWWW
LLLLLLLLLLLLLLLLEEEEEEEMOZZZZZZZZZZZZZZLLLLLLLLLLCCCWWWWWWWWWWWWEEEEEEEEELLLLVXXVXIIIIIIIIIIIIIIIIOOOOOOOOOOOYYYYUUUYUYYUGUUNNNNNNNZZWWWWWWW
LLLLLLLLLDLLLLMMEOOOEEEOOOZZZZZZZZZZZZLLLLLLLLLLLCCCCCWWWWWWWWWWEEEEEEEEEVLLLVVVVCCCIIIIIIIIIIIIIIOOOOOOOOYIYYYYYYYYYUYYYNNNNNNNNZZZZZWWWWWL
LLLLLLLLLLLLMMMMVOVOEOOOOOZZZZZZZZZZZZLLLLLLLLLLLCCCCCWWWWWWWWWEEEEEEEEEVVLLLLLLCCCCCCIIIIIIIIIIIIOOOOOOOOIIYYYYYYYYYYYYYNNNNNNNNZZZZZZWWWWL
LLLLLLLLLLLLMMMMVVVOEOOOOOOZZZZZZZZZZWLLLLLLLLLLCCCCCCCWPPWWWWWEEEEEEEEEEVLLLLLLCCCSPCIIIIIIDIIIIIIOOOOOOOIIYYYYYYYYYYYYNNNNNNNNNNZZZZZZZZWL
LLLLLLLLLLLMMMVVVOOOOOGGGGGGZZZZZZZZZZLLLLLLLLLLLUUUCCCPPPPWWWWWEEEEEEEEELLLLLLLCSSSZZZZZZZZZZZIIIIIOOOOOZZIIYYYYYYYYYYYYYYNNNNNNNZZZZZZZZWL
LLLLLLLLLLLMMVVVVVOGGGGGGGGGZZZZZZZOOULLLSLLLLUUUUUUCCCPPPPPPPWWPEEEEEEELLLLLLLLSSSSZZZZZZZZZZZDIIIOOOOOOZZIIIYYYYYYYYYYYYNNNNNNNNZZZZZZZZZL
RRTTLLLLKKLVVVVVVVVWGGGGGGGGZZZZZZZZZUULUULLLLUUUUUCCCCPPPPPPPPPPEEERELELLLLLLLLLSSSZZZZZZZZZZZDIIIOOOOIIIIIIIIIYYYYYYYYYNNNNNNNNZZZZZZZZZZL
RTTTALLLKKLVVVVVVVVVGGGGGGGZZZZZZZZUQUUUUULUUUUUUUUUCCCPPPPPPPPHPPEEEULLLLLLLLLLLSSSZZZZZZZZZZZDXXOOOIIIIIIIIIIIYYYYYYYYYNNYNNNNNNNQZQZOFFPF
TTTTTLLLKKVVVVVVVVVGGGGGGGGGEEEZZZLUUUUUUUUUUUUUUUUUUCCCPPPPXPZHPGEUUULLLLLLLLLLLSSSZZZZZZZZZZZDDXXOXXXIIIIIIIIIYYYYYYYYYYYYQSSSNQQQQQQFFFFF
TTKTTTTTKKKVVVVVVVVGGGGGGGGEEEEEEZEEUUUUUUUUUUUUUUUUUCCCOPPXXPPHHHHHUULLLLLLLLLLSSSSZZZZZZZZZZZDDXXXXXIIIIIIIIIIYYYYYYYYYYYYYSSQQQQQQQQFFFFF
TTTTTTTTNNKVVVVVVVVGGGGGGGGGEEEEEEEEUUUUCCCCCCCCUUUUUCCOOOPXXHHHHHHKKLLLLLLLLLLLLSSSZZZZZZZZZZZDXXXXXRAAIIIIIIPIYYYYYYYYYYIIIMSMQQQQQQQFFNFF
TTTTTTTNNNKSVVVVVVVGGGGGGGGHHHHHHHEEUUUUCCCCCCCCUUWCCCCCOOOOXXXHHHGKKKKLULLLLALLLSSZZZZZZZZZZZZDDXRXXRAAAIIIIIIIYYYYYYYYIIIIIMMMQQQQQQQQFFFF
TTTTTTTTNNKSSVVSSVGGGGGGGGGHHHHHHHEECCCCCCCCCCCCUUWWCCCCOXOXXXXXXKKKKKKLLLOLLAALSSSZZZZZZZZZZZZDXXRRRRPAAIIIIIIIMMMYYYYYIMMIIMMMQQQQQQQFFFFF
TTTTTTTTRRSSSBVSVVGGGGGGGGGHHHHHHHEUCCCCCCCCCCCCKWWWWWWWOOOXXXXXXKKKKKKKLLLHLAAASSSZZZZZZZZZZZZDDDRRRRPPPFIIIIIIMMMMYYIIIMMMMMMMMQQQQBFFFFFF
TTTTTTTTRTSSSSSSVGGGGGGGGHHHHHHHHHEVCCCCCCCCCCCCNNWWWWWWWWWWXXXKKRKKKKKKKLLLLLAAASSZZZZZZZZDDDDDDRRRRPPPPPPIIIIIMMMMMIIMMMMMMMMMMQQQQBFBBBFF
TTTTTTTTRTSSSSSSSLLLGGGGGHHHHHHHHHEVCCCCCCCCCCCCNNWWWWWWWWWSXXXKKKKKKKKKKLLLLLAAAASZZZZZZZZDDDDDDRRRRRPPPPPRRRIMMMMMIIIIMMMMMMMMMQQQBBBBBBFF
TTTTTTTTTTSSSSSSPLLLLGGGLHHHHHHHHHAVVVVVVCCCCCCCNNNNWWWWWWSSXXXKKKKKKKKKKKLLAAAAAGGZZZZZZZZQQDRRDDRRRPPPRRRRRRMMMMMMMIIIMMMMMVVVVVVVVVVBFFFF
TTTTTTTTTTSSSSSSSLLLLLLLLHHHHHHHHHAVVVVVVCCCCCCCNNNNNNWWWWSXXXXXKKKKKKKKKKLKKKKKAAGGGGGGQQQQQQRRRRRRRRRPRRRRRMMMMMMMMIIIMMMMMVVVVVVVVVVBRRRR
TTTTTTTTTTSSSSSSLLLLLLLLLHHHHHHHHHVVVVVVVVVNNNNNNNNNNNNWWWSSXXXXSKKKKKKKKKKKKKKAAAGGGGGSSQQQQQQTRRRRRRRRRSSRRSNMMMMMMIIIMMMMMVVVVVVVVVVBRRRR
LLLLTTTTCCCCSSSSLLLLLLLLLHHHHHHHHHDVVVVVVVVNNNNNNNNNNNNNNSSSSSSSSKKKKKKKKKKKKKKKAAGSSSGSSQQQQQTTRRRRRSSSSSSRRSSMMMMMMIIIMMMMVVVVVVVVVVVBBRRR
LLLLLTTTTTSSSSSSLJLLLLLLLHHHHHHHHHDVVVVVVVVVNNNNNNNNNNNNSSSSSSSSSSSKKKDDKKKKKKKKKKSSSSSSSSQQQTTTRTTTTTSSSSSSSSSMMMMMMVVIMMMPVVVVVVVVVVVBBRRR
LLLLLTTTTLSSSSRJJJJLLLLLLHHHHHHHHHDVXVVVVVVVFFNNNNNNNNNSSSSSSSSSSSKKKKDDKKKKKKKKKKSSSSSSSSQQTTTTTTTTTUSSSSSSSSSMMMMMMVVVMMMMVVVVVVVVVAAAURRR
LLLLLLLLLLLLSJJJJRLLLLLZZHHHHHHHHHFFVVVVVVVVFFFFFFNNNNNSSSSSSSSSSSSSKDDDDDKKSSKSSKSSLSSSSQQTTTTTTTTTTUUUUSSSSSVVVVVVVVVVMMMSVVVVVYYYYARRRRRR
LLLLLLLLLLKKKJJJJRLLHHHHHHHHHHHHHHFFDMVVVVVQQFFFFFFNNNNSSSSSSSSSSSSSSSSMDDDDSSSSSSSSLSSLSQTTTTTTTTTTTUUUSSSSSSVVVVVVVVVVVMMJJJJYYYYYYAARRRRR
MLLLLLLLLLKKKJJJJJRLHHHHHHEDDDDDDDDDDMMVVVVQFFFFFFFFNNSSSSSSSSSSSSSSSSSMDDSSSSSSSSSSLLSLLQTTTTTTTTTEIIISSSSSSSSMVVVVVVVVJJMJJJYYYYAAAAAAAAVV
MLLLLLLLLLKJJJJJJJJRHHHHHHDDDDDDDDDDDDDDQQQQFFFFFFNNNFFMSSSSSSSSSSSSSSSDDDDDSSSSSSSLLLLLVTJTTTTTTTTEIIIISSSSSSSSVVVVVVVJJJJJJJJJYYAAAAAAAAAA
MMMLLLLLLLLJJJJJJJRREEEEEELDDDDDDDDDDDDDQQQQFFFFFFFFFFFSSSWWWWSSSSSSSSSFDDDSSSSSSSLLLLLLTTTTTTTTTTTEIIISSGGGWMMHMMMVVVVJJJJJJJJJJJJAAAAAAAAA
RMRLLLLLLLLJJJJJJRRREEEEEEDDDDDDDDDDDDDQQQQQFFFFFFFFFFFFSLWWWSSSSSSSSSFFFDDSSSSSSSSSLLLLLLTTTTTTTTEEIIIIGBGGGGMMMMMMMVJJJJJJJJJJJJAAAAAAAAAU
RRRBBLLLRRRJJJJJRRRREEEEEEEDDDDDDDDDDDDQQQQQQFFFFFFFFFFFSLLWWWSSSSSSFFFFDDNSSSSSSSSSLLLGLMMTKTTTTTEEIIIIGBBGGGGMMMMJJJJJJJJJJJJJJJAASAAAAAAU
RRRRLLLLRRJJJJJRRREEEEEEEEEDDDDDDDDDDDQQQQQQFFFFFFFFFFFFSLLLLLSSSSFFFFFNNNNNNSSSSSSSSLLLLMMTTTTTTTTTIIIGGGGGGGGGGGGGZJJJJAAJJJJJJAAAAAAAAAUU
RRRRRRRRRRRRJJJRRREEEEEEEEEDDDDDDEDDDQQQQQQQFFFFFFFFFFFLLLLLFFSSSSSFFFNNNNNNNSNSSSSSSLLLMMMIIIIITPTTIIIGGGGGGGGGGGGGOIIJJAAAAAAAAAAAAAAAAAUU
RRRRRRRRRRRRRJRRRRREEEEEEEDDDDDEEEEDQQQQQQQQFFFFFFFFFFFLLLLLFFSSSFFFFFNNNNNNWNNNSSSSSMMMMMMIIIIPPPTIIIGGGGGGGGGGGGGGOOOJOAAAWWWWAAAAAAAAAUUU
RRRRRRRRRRRRRRRRRRREEEEEEEDDDEDEEEQQQQQEQQQQSSFFFFFFFFFLFLLLFFFSSFFFNNNNNNNNNNNNSMMMSMMMMMMIIIIIPIIIIIGIIIGGGGGGGGGGOOOOOOAAAAWAAAAAAAAAAUUU
RRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEQQQQEEQQQSSFFFFFFFFFDFFFLLLLFFFFFFNNNNNNNNNMMNMMMMSMMMMMIIIIIIPIIIIIIIIIGGGGGGGGGGGOOOOZANNWWWWAAAAAUUUUUU
RRRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEQSSSFFFFFFFFFFFFFFFLLFFFFPPPNNNNNNMNMMMMMMMMMMMMMMMIIIIIIIIIIIIIIIGGGGGGGGGGGOZZZZZNNWWWWAAAAUUUUUUU
RRRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEQQSSSSSSSSFFFFFXFFNNNLFFFFPPPNNBBNMMMMMMMMMMMMMMMMMMIIIIIIIIIIIIIIIIIQGGGGGGGGZZZZZZNWWWWWWAUUUUUUUUU`;export{t as input,X as part1,n as part2};
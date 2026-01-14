
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Sparkles, Cross, Star, Users, UserRound, Info } from 'lucide-react';

type PrayerTab = 'list' | 'detail';

interface Prayer {
  id: string;
  title: string;
  category: string;
  icon: any;
  content: React.ReactNode;
}

const OracoesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PrayerTab>('list');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);

  const prayers: Prayer[] = [
    {
      id: 'sao-joaquim',
      title: 'Oração a São Joaquim',
      category: 'Padroeiro',
      icon: UserRound,
      content: (
        <div className="space-y-6">
          <div className="space-y-4 font-serif text-lg leading-relaxed italic text-justify">
            <p>
              Ó grande patriarca São Joaquim, nosso glorioso padroeiro, nós, devotos vossos, nos regozijamos com o pensamento de terdes sido escolhido entre todos os santos, para cooperar nos mistérios divinos e enriquecer o mundo com a bem-aventurança Mãe de Deus e nossa, vossa filha Maria Santíssima.
            </p>
            <p>
              Por este singular privilégio, sois poderosíssimo junto à Mãe e o Filho de Deus, de sorte que não há graça que não possais alcançar.
            </p>
            <p>
              Recorro a vós, animado por essa confiança plena, pedindo vossa valiosíssima proteção e recomendando-vos todas as minhas necessidades espirituais e temporais bem como as da minha família.
            </p>
            <p>
              Peço-vos, ó glorioso santo, a graça especial de <span className="text-amber-600 font-bold not-italic">(fazer o pedido)</span> e espero obtê-la pela vossa paternal intercessão. Peço particularmente a graça do amor perseverante a Jesus e Maria, a fim de que eu viva e morra na fé, esperança e caridade, invocando também o vosso bendito nome.
            </p>
            <p className="font-bold text-center not-italic pt-2">Amém.</p>
          </div>

          <div className="mt-8 p-6 bg-amber-50 dark:bg-slate-900/50 rounded-2xl border border-amber-100 dark:border-amber-900/20 space-y-3">
            <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-500">
              <Info className="w-4 h-4" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">Curiosidades</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              São Joaquim foi o pai da Santíssima Virgem Maria e, portanto, avô do Nosso Senhor, Jesus Cristo. A devoção a ele é milenar na tradição cristã.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Considerado o <strong>Padroeiro dos Avós</strong>, sua festa litúrgica é celebrada em 26 de julho, dia em que também honramos Sant'Ana.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'terco-mariano',
      title: 'Santo Terço Mariano',
      category: 'Devocionário',
      icon: Cross,
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <div className="border-l-4 border-amber-200 pl-4 py-1">
              <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest mb-2">Oferecimento do Terço</h4>
              <p className="text-sm italic leading-relaxed">
                Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.
              </p>
            </div>

            <div className="py-2">
              <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest mb-1">Sinal da Cruz</h4>
              <p className="font-serif text-lg">Em nome do Pai, do Filho e do Espírito Santo. Amém.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest">Credo</h4>
              <p className="text-sm leading-relaxed">
                Creio em Deus Pai Todo-Poderoso, Criador do Céu e da Terra; e em Jesus Cristo, Seu único Filho, Nosso Senhor; Que foi concebido pelo poder do Espírito Santo. Nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto, sepultado; desceu a mansão dos mortos. Ressuscitou no terceiro dia. Subiu ao Céu, onde está sentado à direita de Deus Pai Todo-Poderoso, de onde há-de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na Comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.
              </p>
            </div>
          </section>
          
          <div className="h-[1px] bg-amber-100"></div>

          <section className="space-y-6">
            <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest text-center">Orações Fundamentais</h4>
            <div className="space-y-4 text-sm bg-amber-50/50 dark:bg-slate-900/50 p-4 rounded-2xl">
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-500 mb-1">Pai Nosso</p>
                <p>Pai nosso, que estais nos Céus, santificado seja o Vosso Nome; venha a nós o Vosso Reino, seja feita a Vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.</p>
              </div>
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-500 mb-1">Ave Maria</p>
                <p>Ave Maria, cheia de graça, o Senhor é convosco; bendita sois Vós entre as mulheres e bendito é o fruto do Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.</p>
              </div>
              <div>
                <p className="font-bold text-amber-800 dark:text-amber-500 mb-1">Glória</p>
                <p>Glória ao Pai, ao Filho e ao Espírito Santo. Assim como era no princípio, agora e sempre, pelos séculos dos séculos. Amém.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest">Os Mistérios</h4>
            <div className="grid gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl">
                <p className="font-bold text-xs mb-2">Gozosos (Segunda e Sábado)</p>
                <ul className="text-xs space-y-1 list-decimal list-inside opacity-70">
                  <li>Anunciação</li><li>Visitação</li><li>Nascimento</li><li>Apresentação</li><li>Perda e Encontro</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl">
                <p className="font-bold text-xs mb-2">Luminosos (Quinta-feira)</p>
                <ul className="text-xs space-y-1 list-decimal list-inside opacity-70">
                  <li>Batismo</li><li>Caná</li><li>Reino</li><li>Transfiguração</li><li>Eucaristia</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl">
                <p className="font-bold text-xs mb-2">Dolorosos (Terça e Sexta)</p>
                <ul className="text-xs space-y-1 list-decimal list-inside opacity-70">
                  <li>Agonia</li><li>Flagelação</li><li>Coroação</li><li>Cruz</li><li>Morte</li>
                </ul>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-700 rounded-xl">
                <p className="font-bold text-xs mb-2">Gloriosos (Quarta e Domingo)</p>
                <ul className="text-xs space-y-1 list-decimal list-inside opacity-70">
                  <li>Ressurreição</li><li>Ascensão</li><li>Pentecostes</li><li>Assunção</li><li>Coroação de Maria</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="bg-amber-600 text-white p-5 rounded-2xl shadow-lg">
              <h4 className="font-bold uppercase text-[10px] tracking-widest mb-2">Ó meu Jesus</h4>
              <p className="italic font-serif">"Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno; levai as almas todas para o Céu, principalmente as que mais precisarem."</p>
            </div>
          </section>

          <div className="h-[1px] bg-amber-100"></div>

          <section className="space-y-4 pb-4">
            <h4 className="font-bold text-amber-700 uppercase text-[10px] tracking-widest">Salve, Rainha</h4>
            <p className="font-serif italic text-lg leading-relaxed">
              Salve, Rainha, Mãe de Misericórdia, vida, doçura e esperança nossa, Salve. A Vós bradamos, os degredados filhos de Eva. A Vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, Advogada nossa, esses Vossos olhos misericordiosos a nós volvei; e depois deste desterro nos mostrai Jesus, bendito Fruto do Vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria.
            </p>
            <div className="text-sm font-bold space-y-1 pt-2">
              <p>V. Rogai por nós, Santa Mãe de Deus,</p>
              <p>R. Para que sejamos dignos das promessas de Cristo. Amém.</p>
            </div>
          </section>
        </div>
      )
    },
    {
      id: 'misericordia',
      title: 'Terço da Misericórdia',
      category: 'Jesus Misericordioso',
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <p className="text-xs text-slate-400 italic">"Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós!" (Diário, 187)</p>
          
          <section className="space-y-2">
            <h4 className="font-bold text-amber-700 uppercase text-xs tracking-widest">Início</h4>
            <p>Pai Nosso, Ave Maria e Creio.</p>
          </section>

          <section className="bg-amber-50 dark:bg-slate-900 p-4 rounded-xl space-y-3">
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter">Nas contas grandes:</p>
              <p className="text-sm italic">"Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro."</p>
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-tighter">Nas contas pequenas (10x):</p>
              <p className="text-sm italic">"Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro."</p>
            </div>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-amber-700 uppercase text-xs tracking-widest">Finalização (3x)</h4>
            <p className="font-bold">"Deus Santo, Deus Forte, Deus Imortal, tende misericórdia de nós e do mundo inteiro."</p>
            <p className="text-xs mt-4">"Pelo Terço, conseguirás tudo, se o que pedires estiver de acordo com a Minha vontade." (Diário, 1731)</p>
          </section>
        </div>
      )
    },
    {
      id: 'sao-miguel',
      title: 'São Miguel Arcanjo',
      category: 'Proteção',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="font-bold italic">Oração de Leão XIII</p>
          <p className="font-serif text-lg leading-relaxed italic">
            "São Miguel Arcanjo, defendei-nos no combate, sede nosso refúgio contra a maldade e as ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pelo divino poder, precipitai no inferno a satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas. Amém."
          </p>
        </div>
      )
    },
    {
      id: 'anjo-guarda',
      title: 'Santo Anjo da Guarda',
      category: 'Proteção',
      icon: Star,
      content: (
        <div className="space-y-4">
          <p className="font-serif text-xl leading-relaxed italic text-center py-6">
            "Santo Anjo do Senhor,<br/>meu zeloso guardador,<br/>se a ti me confiou a piedade divina,<br/>sempre me rege, me guarde,<br/>me governe me ilumine. Amém."
          </p>
        </div>
      )
    },
    {
      id: 'sao-bento',
      title: 'Oração de São Bento',
      category: 'Exorcismo',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="text-center font-bold text-amber-600 mb-4 tracking-widest">C.S.P.B.</div>
          <p className="font-serif text-lg italic leading-relaxed">
            "A Cruz Sagrada seja a minha luz, não seja o dragão meu guia. Retira-te satanás, nunca me aconselhes coisas vãs. É mau o que tu ofereces, bebe tu mesmo o teu veneno."
          </p>
          <p className="text-center text-xs text-slate-400 mt-4 uppercase">Crux Sacra Sit Mihi Lux / Non Draco Sit Mihi Dux</p>
        </div>
      )
    },
    {
      id: 'protecao-mae',
      title: 'À Vossa Proteção',
      category: 'Maria',
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="font-serif text-xl leading-relaxed italic">
            "À vossa proteção recorremos, Santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém."
          </p>
        </div>
      )
    },
    {
      id: 'couraca',
      title: 'Couraça de São Patrício',
      category: 'Fortaleza',
      icon: Shield,
      content: (
        <div className="space-y-4 text-sm leading-relaxed text-justify">
          <p>Hoje me levanto com poderosa força e invoco à Santíssima Trindade com Trinitária fé professando a unidade do Criador e da criatura.</p>
          <p>Hoje me levanto com a força do nascimento de Cristo, com a graça do seu batismo, com a força de sua crucificação e morte, com a força de sua ressurreição e ascensão, com a força de seu retorno no dia do juízo.</p>
          <p>Hoje me levanto com a força do amor do Querubim, obediente aos anjos, a serviço dos arcanjos, na esperança da ressurreição para encontrar consolo com as orações dos patriarcas, as predições dos profetas, os ensinamentos dos apóstolos, a fé dos confessores, a inocência das santas virgens, os feitos dos homens de bem.</p>
          <p>Hoje me levanto com a força dos céus: a luz do sol, o brilho da lua, o esplendor do fogo, a velocidade do trovão, a rapidez do vento, a profundidade dos mares, a permanência da terra, a firmeza da rocha.</p>
          <p>Hoje me levanto com a força de Deus que me guia: sua grandeza que me apoia, sua sabedoria que me guia, seu olho que me cuida, seu ouvido que me escuta, sua palavra que me fala, sua mão que me defende, seu caminho para segui-lo, seu escudo para proteger-me, sua Eucaristia para livrar-me das armadilhas do demônio, da tentação dos vícios, daqueles que me desejam o mal, longe ou perto, só ou acompanhado.</p>
          <p>Invoco hoje estes poderes para que se levantem entre mim e estes males, contra todos e cruéis infames poderes que desejam o mal, para meu corpo, contra as invocações dos falsos profetas, contra as nefastas leis da pagania, contra as falsas leis da heresia, contra as artes da idolatria, contra os feitiços das bruxas, quiromantes e feiticeiros, contra todo conhecimento que corrompe o corpo e a alma.</p>
          <p>Cristo que me protege hoje contra o veneno, contra o fogo, contra morrer afogado, contra ser ferido, para que assim venha a mim abundante consolo.</p>
          <p className="font-bold italic text-center py-4 text-amber-700">
            Cristo comigo, Cristo à minha frente, Cristo atrás de mim, Cristo em mim, Cristo abaixo de mim, Cristo sobre mim, Cristo à minha direita, Cristo à minha esquerda, Cristo quando me deito, Cristo quando me sento, Cristo quando me levanto...
          </p>
          <p>Cristo no coração de todo homem que pensa em mim, Cristo na boca de quem fale de mim, Cristo em todo olho que me vê, Cristo em todo ouvido que me ouve. Hoje me levanto com poderosa força e invoco à Santíssima Trindade com trinitária fé professando a unidade do Criador e da criatura. Amém.</p>
        </div>
      )
    },
    {
      id: 'maria-passa',
      title: 'Maria, passa na frente',
      category: 'Confiança',
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="font-serif text-lg leading-relaxed italic">
            "Maria, passa na frente e vai abrindo estradas, portas e portões, abrindo casas e corações."
          </p>
          <p className="text-sm">A Mãe indo à frente, os filhos estão protegidos e seguem teus passos. Ela leva todos os filhos sob sua proteção.</p>
          <p className="text-sm">Maria, passa na frente e resolve aquilo que somos incapazes de resolver. Mãe, cuida de tudo que não está ao nosso alcance. Tu tens poderes para isso. Vai, Mãe, vai acalmando, serenando e amansando os corações, vai acabando com o ódio, os rancores, mágoas e maldições.</p>
          <p className="text-sm">Maria, vai terminando com as dificuldades, tristezas e tentações, vai tirando seus filhos das perdições. Maria, passa na frente e cuida de todos os detalhes, cuida, ajuda e protege a todos os seus filhos. Maria Tu és a Mãe também porteira. Vai abrindo o coração das pessoas e as portas nos caminhos. Maria, eu te peço, passa na frente e vai conduzindo, levando, ajudando e curando os filhos que precisam de Ti.</p>
          <p className="font-medium italic">Ninguém pode dizer que foi decepcionado por Ti, depois de a ter chamado ou invocado. Só tu, com o poder de teu Filho, pode resolver as coisas difíceis e impossíveis. Nossa Senhora, faço esta oração pedindo a sua proteção, rezando um Pai-Nosso e três Ave-Marias. Amém.</p>
        </div>
      )
    }
  ];

  const openPrayer = (prayer: Prayer) => {
    setSelectedPrayer(prayer);
    setActiveTab('detail');
    window.scrollTo(0, 0);
  };

  if (activeTab === 'detail' && selectedPrayer) {
    return (
      <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-10">
        <header className="flex items-center justify-between">
          <button onClick={() => setActiveTab('list')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center flex-1 pr-10">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{selectedPrayer.category}</span>
            <h3 className="text-xl font-serif font-bold">{selectedPrayer.title}</h3>
          </div>
        </header>

        <article className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 leading-relaxed text-slate-800 dark:text-slate-200">
          {selectedPrayer.content}
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-4">
        <h2 className="text-3xl font-serif font-bold">Orações</h2>
        <p className="text-slate-500 italic">Um refúgio para o seu coração encontrar a paz em Deus.</p>
      </header>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Devocionário</h3>
        {prayers.map((prayer) => (
          <button 
            key={prayer.id}
            onClick={() => openPrayer(prayer)}
            className="flex items-center p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-amber-400 transition-all text-left group"
          >
            <div className={`p-3 bg-slate-50 dark:bg-slate-900 rounded-xl mr-4 group-hover:bg-amber-50 transition-colors ${prayer.category === 'Padroeiro' ? 'bg-amber-100/50' : ''}`}>
              <prayer.icon className={`w-5 h-5 group-hover:text-amber-600 ${prayer.category === 'Padroeiro' ? 'text-amber-600' : 'text-slate-400'}`} />
            </div>
            <div className="flex-1">
              <span className={`text-[9px] uppercase tracking-widest ${prayer.category === 'Padroeiro' ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                {prayer.category}
              </span>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{prayer.title}</h4>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-amber-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OracoesView;

const filmes = [
  {
    "tipo": "filme",
    "titulo": "Cruzeiro das Loucas",
    "descricao": "Um agente de viagens decide dar uma lição em Nick, e seu melhor amigo Jerry, fazendo uma reserva para os dois em um cruzeiro exclusivo para homossexuais. Quando eles percebem isso, já é tarde demais, mas aos poucos eles vão deixando seus sentimentos homofóbicos de lado e acabam conhecendo Inga, uma linda modelo, e Gabriella, uma professora de dança por quem Jerry se apaixona.",
    "capa": "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/73/90/20425630.jpg",
    "categoria": "Comédia",
    "id": "0ByfEzfBLMGseWUwydWk5YXZveEU",
    "mostrarNoBanner": false
  },
  {
    "tipo": "filme",
    "titulo": "Debi & Lóide: Dois Idiotas em Apuros",
    "descricao": "Dois amigos debilóides vão para Aspen, no estado do Colorado para tentar devolver uma maleta esquecida pela passageira da limusine que um deles estava dirigindo para o aeroporto. Sem saber que na mala havia uma quantia enorme de dinheiro, que serviria para pagar o resgate de um sequestro, os dois acabam sendo perseguidos pela polícia e por assassinos profissionais.",
    "capa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jX2Dzr370H9xM9nawnmBXMXRg3FIFEgyE5o72pu2S7WV5AMwuiZvr1fWE86ib_D3RkGWu-BZDyA7BVJKSN8Eb5zA4GaWxzBApzrXcyIJ0A",
    "categoria": "Comédia",
    "id": "0ByfEzfBLMGseS0ZjM25OQVl1TVE",
    "mostrarNoBanner": true
  },
  {
    "tipo": "filme",
    "titulo": "Homem de Ferro 2008",
    "descricao": "Tony Stark é um industrial bilionário e inventor brilhante que realiza testes bélicos no exterior, mas é sequestrado por terroristas que o forçam a construir uma arma devastadora. Em vez disso, ele constrói uma armadura blindada e enfrenta seus sequestradores. Quando volta aos Estados Unidos, Stark aprimora a armadura e a utiliza para combater o crime.",
    "capa": "https://br.web.img3.acsta.net/medias/nmedia/18/91/79/19/20163665.jpg",
    "categoria": "Ficção científica",
    "id": "1J1CFY7k8-7yZ-BQLzQxHXb2q1ZCIZYyS",
    "mostrarNoBanner": false,
    "prioridade": 1
  },
  {
    "tipo": "filme",
    "titulo": "Pantera Negra",
    "descricao": "A história de T'Challa, príncipe do reino de Wakanda, que perde o seu pai e viaja para os Estados Unidos, onde tem contato com os Vingadores. Entre as suas habilidades estão a velocidade, a inteligência e os sentidos apurados.",
    "capa": "https://br.web.img3.acsta.net/c_310_420/pictures/17/12/07/16/09/2291532.jpg",
    "categoria": "Ficção científica",
    "id": "16qP5PXShxzr1lQuOyiUzbBdCoWSn6YHr",
    "mostrarNoBanner": true,
    "prioridade": 1
  },
  {
    "tipo": "filme",
    "titulo": "Thor: Ragnarok",
    "descricao": "Após anos afastado, Thor retorna para casa e descobre que seu pai, Odin, rei de Asgard, está desaparecido. Após encontrá-lo, ele toma conhecimento de sua irmã mais velha, Hela, a poderosa e implacável deusa da morte. Com o auxílio de Loki, ele enfrenta Hela, mas durante a batalha, Thor acaba preso em Sakaar, um planeta do outro lado do universo. Agora, ele precisa correr contra o tempo para voltar a Asgard e impedir o Ragnarok, a destruição de seu mundo.",
    "capa": "https://br.web.img3.acsta.net/pictures/17/08/26/00/05/175443.jpg",
    "categoria": "Ficção científica",
    "id": "1rLgotI926KQiVjMs5DEXOffDnHoqvBaV",
    "mostrarNoBanner": true,
    "prioridade": 1
  },
  {
    "tipo": "filme",
    "titulo": "Os Vingadores - The Avengers",
    "descricao": "Loki, o irmão de Thor, ganha acesso ao poder ilimitado do cubo cósmico ao roubá-lo de dentro das instalações da S.H.I.E.L.D. Nick Fury, o diretor desta agência internacional que mantém a paz, logo reúne os únicos super-heróis que serão capazes de defender a Terra de ameaças sem precedentes. Homem de Ferro, Capitão América, Hulk, Thor, Viúva Negra e Gavião Arqueiro formam o time dos sonhos de Fury, mas eles precisam aprender a colocar os egos de lado e agir como um grupo em prol da humanidade.",
    "capa": "https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg",
    "categoria": "Ficção científica",
    "id": "1x8vggp1DE_AY1tOhcmSNRtdHSHAKMm3_",
    "mostrarNoBanner": false,
    "prioridade": 1
  },
  {
    "tipo": "filme",
    "titulo": "Guardiões da Galáxia Vol. 2",
    "descricao": "Os Guardiões da Galáxia lutam para manter sua nova família unida enquanto desvendam os mistérios sobre o verdadeiro pai de Peter Quill.",
    "capa": "https://upload.wikimedia.org/wikipedia/pt/0/07/Guardians_of_the_galaxy_vol_two_poster.jpg",
    "categoria": "Ficção científica",
    "id": "1cRRbvf6SMEGoHQvnlvdVov8wO84b__X7",
    "mostrarNoBanner": false,
    "prioridade": 1
  },
  {
    "tipo": "filme",
    "titulo": "10 Coisas que Eu Odeio em Você",
    "descricao": "Bianca Stratford é bonita e popular, mas não pode namorar antes que sua irmã mais velha encontre um namorado primeiro. O problema é que nenhum garoto consegue chegar perto da irmã, Kat Stratford. Para resolver a situação, um rapaz interessado em Bianca suborna um amigo com passado misterioso para sair com Kat e, quem sabe, tentar conquistá-la.",
    "capa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAvOuddbilvDpGaQLwZJO_uVHLeNw5T6kjRBH1E8-0mrq7rBy1l9WawsYLfHELqsSV0yLX0chjWTyl9DzETXlovBqXGPZAFKmUvaQlqDxq",
    "categoria": "Romance",
    "id": "1abkKtm9MvEloFyU89MoTbNxZ6C9I2xfk",
    "mostrarNoBanner": true
  },
  {
    "tipo": "anuncio",
    "titulo": "ErikFlix",
    "descricao": "",
    "capa": "https://i.imgur.com/FEXQZKV_d.webp?maxwidth=1520&fidelity=grand",
    "categoria": "",
    "id": "",
    "mostrarNoBanner": true,
    "prioridade": 5
  },
  {
    "tipo": "filme",
    "titulo": "A Hora do Pesadelo 2: A Vingança de Freddy",
    "descricao": "Uma nova família se muda para a casa em Elm Street, e logo os garotos estão tendo pesadelos com Freddy Krueger, o falecido assassino de crianças. Desta vez, ele tenta tomar o corpo de um adolescente para continuar matando no mundo real.",
    "capa": "https://m.media-amazon.com/images/M/MV5BNWM4NWFlOGMtYmY0My00MDFhLWFiNDQtNjk3ODRhZGVlNjY0XkEyXkFqcGc@._V1_.jpg",
    "categoria": "Terror",
    "id": "1TDckZfKcngRefOLUMggSYve-KTZnsE3u",
    "mostrarNoBanner": true,
    "prioridade": 1
  }
];
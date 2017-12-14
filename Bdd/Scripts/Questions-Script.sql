-- Sécurité physique
call audit.Add_Question('La topographie du site assure-t-elle une sécurité satisfaisante?', 'La topographie actuelle réduit-t-elle les moyens d\'attaque ou d\'accès?', 1, 0, 1);
call audit.Add_Question('Combien y a-t-il de points d\'entrée?', 'Comptez le nombre de points d\'entrée physique au site.', 2, 0, 1);
call audit.Add_Question('Sont-ils bien surveillés?', 'L\'accès à ces points sont-ils surveillés (ex: badge nécessaire, vigile à l\'entrée, caméra de sécurité, ...)', 3, 2, 1);
call audit.Add_Question('Toutes les personnes entrantes et sortantes passent-elles par un point de contrôle?', 'Présentation obligatoire d\'un badge / papier d\'identité. Une distinguestion est-elle faite selon le grade de la personne?', '', 4, 0, 1);
call audit.Add_Question('Les portes, fenêtres, portails, tourniquets sont-ils surveillés?', 'Ce point porte plus particulièrement sur des zones donnant un accès à une zone sensible de l\'entreprise', '', 5, 0, 1);
call audit.Add_Question('Les moyens d\'entrée peuvent-ils être consultés pour identifier qui a accédé à ces zones?', 'Logs de passages, registres des entrées sorties sur papier, ...', '', 6, 0, 1);
call audit.Add_Question('Le site est-il entouré d\une clôture quelconque?', 'Murs, grillage, ...', '', 7, 0, 1);
call audit.Add_Question('Ces clôtures sont-elles suffisamment hautes pour réduire l\'accès non autorisé à la propriété?' , 'Plus elles sont hautes mieux c\'est (§on pourrait indiquer un nombre de mètre à partir duquel ça devient bien§)', '', 8, 7, 1);
call audit.Add_Question('La clôture est-elle vérifiée régulièrement?', 'Afin de déceler des trous, des dommages ou des points d\'accès.', '', 9, 7, 1);
call audit.Add_Question('Les portes d\'entrée sont-elles sécurisées et fonctionnent-elles correctement?', 'Moyen de les verrouiller, se ferme bien, ...', '', 10, 0, 1);
call audit.Add_Question('Les véhicules sont-ils autorisés à accéder librement à la propriété?', 'Présence de barrières de parking, d\'un vigile qui vérifie que le véhicule est bien autorisé à pénétrer dans l\'enceinte', '', 11, 0, 1);
call audit.Add_Question('Les fenêtres pouvant être ouvertes ont-elles un moyen d\'être verrouillées?', 'Un verrou, fermeture automatique, ...', '', 12, 0, 1);
call audit.Add_Question('Si de grandes vitres sont installées dans le bâtiment, sont-elles laminées avec un film de sécurité pour empêcher l\'entrée forcée?', '', '', 13, 0, 1);
call audit.Add_Question('L\'organisation possède-t-elle du personnel de sécurité?', '', '', 14, 0, 1);
call audit.Add_Question('Les ascenseurs et les escaliers sont-ils contrôlés par le personnel de sécurité?', 'Si oui, la fréquence de contrôlé permet de déterminer la note', '', 15, 14, 1);
call audit.Add_Question('L\'organistation utilise-t-elle des moyens de vidéo surveillance?', '', '', 16, 0, 1);
call audit.Add_Question('Le périmètre du bâtiment et le périmètre de la propriété sont-ils adéquatement couverts par des caméras?', '', '', 17, 16, 1);
call audit.Add_Question('Les entrées et sorties du bâtiment sont-elles surveillées par des caméras?', '', '', 18, 16, 1);
call audit.Add_Question('Les cages d\'escalier et autres points d\'accès sont-ils surveillés par des caméras?', '', '', 19, 16, 1);
call audit.Add_Question('Les caméras sont-elles visionnées 24 heures sur 24 ou seulement après un incident?', 'La fréquence de contrôle peut aider à déterminer la note', '', 20, 16, 1);
call audit.Add_Question('Les serrures et l\'équipement de verrouillage sont-ils en bon état et fonctionnent-ils correctement?', '', '', 21, 0, 1);
call audit.Add_Question('Les anciens employés ont-ils encore des clés ou des cartes d\'accès au bâtiment?', '', '', 22, 0, 1);
call audit.Add_Question('Les anciens employés / employés licenciés ont-ils été retirés de l\'accès à la propriété?', '', '', 23, 0, 1);


-- Formation des employés
call audit.Add_Question('Les employés ont-ils été formés à identifier du phishing?', '', '', 1, 0, 2);
call audit.Add_Question('Les employés laissent leur session ouverte lorsqu\'ils quittent leur bureau?', '', '', 2, 0, 2);
call audit.Add_Question('Est-ce que certaines informations importantes sont laisser sur des post-it?', 'Mot de passe réseau / session, code / information sensible', '', 3, 0, 2);
call audit.Add_Question('Les employés sont-ils autorisés à aller sur tous les sites Web qu\'ils désirent?', '', '', 4, 0, 2);
call audit.Add_Question('Les employés sont-ils autorisés à apporter et à utiliser leur propre matériel pour travailler?', 'Ordinateur personnel, téléphone, clé USB, ...', '', 5, 0, 2);
call audit.Add_Question('Les employés sont-ils autorisés à rapporter des informations à leur domicile?', 'Du code, documents papiers, ...', '', 6, 0, 2);


-- Sécurité des données
call audit.Add_Question('Y a-t-il un endroit où toutes les données sont stockées?', 'Datacenter, ...', '', 1, 0, 3);
call audit.Add_Question('Est-ce que les équipes utilisent des sites Web / méthodes tiers pour partager leur travail entre elles?', 'Github, Bitbucket, service could, ...', '', 2, 0, 3);
call audit.Add_Question('Les logs sont-ils conservés?', '', '', 3, 0, 3);
call audit.Add_Question('Existe-t-il un département spécial dédié à la gestion de l\'intégrité des données?', '', '', 4, 0, 3);
call audit.Add_Question('Y a-t-il un département spécial dédié à l\'étude des logs?', '', '', 5, 0, 3);
call audit.Add_Question('Est-ce que les données sensibles sont cryptées', '', '', 6, 0, 3);
call audit.Add_Question('Des sauvegardes sont-elles effectuées?', 'Si oui, la fréquence aide à déterminer la note', '', 7, 0, 3);


-- Sécurité du réseau
call audit.Add_Question('Quels appareils de liaisons sont utilisés?', '(HUB, SWITCH, ROUTER, …)', '', 1, 0, 4);
call audit.Add_Question('Un pare-feu est-il en place?', '', '', 2, 0, 4);
call audit.Add_Question('Un serveur proxy est-il en place?', '', '', 3, 0, 4);
call audit.Add_Question('Un serveur AAA est-il en place?', '', '', 4, 0, 4);
call audit.Add_Question('Les employés peuvent-ils se connecter au réseau interne depuis l\'extérieur?', '', '', 5, 0, 4);
call audit.Add_Question('Y a-t-il des points d\'accès Wi-Fi?', '', '', 6, 0, 4);
call audit.Add_Question('Le mot de passe est-il assez fort?', 'Longueur, diversité des caractères, aucun patern, ...', '', 7, 42, 4);
call audit.Add_Question('Des VLAN sont-ils en place?', '', '', 8, 0, 4);
call audit.Add_Question('Les switchs filtrent-ils les machines via leurs adresses MAC?', '', '', 9, 0, 4);
call audit.Add_Question('Quels sont les algorithmes de chiffrements utilisés?', 'SHA-1, SHA-256, AES, ...', '', 10, 0, 4);
call audit.Add_Question('OSPF est-il utilisé?', '', '', 11, 0, 4);
call audit.Add_Question('RIP est-il utilisé?', '', '', 12, 0, 4);
call audit.Add_Question('Le system lève-t-il une alerte en cas d\'intrusion?', 'IPS, IDS', '', 13, 0, 4);
call audit.Add_Question('Y a-t-il des ports ethernet libre?', '', '', 14, 0, 4);
call audit.Add_Question('Sont-ils activés?', '', '', 15, 50, 4);
call audit.Add_Question('Certaines machines utilisent-elles le promocious mode (ou équivalent comme le monitor mode)?', '', '', 16, 0, 4);
call audit.Add_Question('Y a-t-il un département de sécurité réseau?', '', '', 17, 0, 4);


-- Sécurité logicielle
call audit.Add_Question('L\'organisation protège-t-elle ses logiciels?', '', '', 1, 0, 5);
call audit.Add_Question('L\'organisation utilise-t-elle des logiciels piraté?', '', '', 2, 0, 5);
call audit.Add_Question('L\'organisation utilise-t-elle un antivirus?', '', '', 3, 0, 5);
call audit.Add_Question('Après la découverte d\'une faille, une mise à jour est-elle effectuée rapidement?', '', '', 4, 0, 5);

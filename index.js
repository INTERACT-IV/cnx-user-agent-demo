import {CnxUserAgent} from '@connectics/cnx-user-agent'

// Les valeurs suivantes sont fournies par Connectics
const server = "Prendre_contact_avec_Connectics"
const user = "Prendre_contact_avec_Connectics"
const password = "Prendre contact avec Connectics"

// Les callbacks écriront dans l'élément logs_agents
const logs_agent1=document.getElementById( 'logs_agent1' )

// Exemples de déclaration de callback avec des fonctions nommées
function cbAccept(code, reason) {
  logs_agent1.innerText += `Agent1 connecté, enregistrement accepté (code SIP = ${code}, raison = ${reason})\n`
}

function cbInvite(call_id, from, pai) {
  logs_agent1.innerText += `Appel de ${from}\n\t(pai=${pai})\n\t(Call-ID=${call_id})\n`
}

// Les callbacks peuvent être liés aux événements du CnxUserAgent de la manière suivante : 
const callbacks = {
  onAccept : cbAccept,   
  onReject : (code, reason) => {logs_agent1.innerText += `Enregistrement refusé code SIP = ${code}, raison = ${reason}\n`},   
  onInvite : (call_id, from, pai) => { agent1.answer() },   // Exemple de décroché automatique : Sur présentation d'un appel on décroche (Ce callback est écrasé plus loin dans le code par une liaison tardive)
  onMedia : () => { logs_agent1.innerText += "Connexion média établie\n"},
  onHangup : (is_local_hangup) => {if(is_local_hangup) logs_agent1.innerText += "Raccroché local (par l'appelé)\n"; else logs_agent1.innerText += "Raccroché distant (par l'appelant)\n"},
}

// audio_agent1 est le nom d'une balise audio déclarée dans le html.
// le paramètre callbacks peut être omis si on souhaite lier les callbacks après avoir créé le CnxUserAgent
const agent1 = new CnxUserAgent(server, user , password, 'audio_agent1', callbacks)
agent1.trace_on()     // Lorsqu'on active les traces, tous les événements internes de CnxUserAgent sont affichés dans la console.

agent1.onInvite = cbInvite   // Exemple de liaison tardive : elle remplace celle définie dans l'objet callbacks.

// Evénements DOM 
document.getElementById('btn_register').addEventListener('click',()=>{
  agent1.register()   // Connexion sur le serveur Consistent, en retour les événements onAccept ou onReject se déclencheront
})   
document.getElementById('btn_answer').addEventListener('click',()=>{
  // Décroché de l'appel présenté par l'événement onInvite. 
  // La communication ne sera établie qu'au déclenchement de l'événement onMedia. 
  // Attention Le laps de temps entre le décroché et la réception de l'événement onMedia n'est pas négligeable (quelques secondes).
  agent1.answer()     
})       



document.getElementById('btn_hangup').addEventListener('click',()=>{
  // Raccroché d'un appel décroché ou refus d'un appel présenté
  agent1.hangup()
})
      


// Les traces SIP sont requises pour le diagnostic Connectics.
// la fonction sip_trace_off() retourne les messages SIP envoyés et reçus depuis l'appel à sip_trace_on()
document.getElementById('btn_sip_trace').addEventListener('click',()=>{
    if(agent1.active_sip_trace){
      document.getElementById('sip_traces_agent1').innerText = agent1.sip_trace_off()
      document.getElementById('btn_sip_trace').innerText = "Activer les traces SIP"
    }
    else{
      agent1.sip_trace_on()
      document.getElementById('btn_sip_trace').innerText = "Désactiver les traces SIP"
    }
})



// TODO : Quid lors de la déconnexion de la WS ?

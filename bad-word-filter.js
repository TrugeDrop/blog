/* Bad Word Filter */

const Filter = require('bad-words'); 

module.exports = (message) => {
    function hash(data){
        const result = data.replace(/_56-67_/g, "a")
            .replace(/_21-66_/g, "e")
            .replace(/_56-43_/g, "i")
            .replace(/_87-54_/g, "l")
            .replace(/_23-55_/g, "o")
            .replace(/_32-89_/g, "b")
            .replace(/_36-54_/g, "u")
            .replace(/_35-43_/g, "ı")
            .replace(/_40-93_/g, "t")
            .replace(/_33-53_/g, "p")
        
        return result;
    }
    
    const bad_words = [
        hash("s_56-67__87-54__56-67_k"),
        hash("m_56-67__87-54_"),
        hash("_56-67_p_40-93_a_87-54_"),
        hash("g_21-66_r_56-43_z_21-66_k_56-67__87-54__35-43_"),
        hash("_23-55_r_23-55_s_33-53_u"),
        hash("_23-55_r_23-55_s_32-89_u"),
        hash("_23-55_rr_23-55_s_32-89_u"),
        hash("_56-67_m_56-43_n_56-67_"),
        hash("_56-67_m_35-43_n_56-67_"),
        hash("s_56-43_k_40-93__56-43_r"),
        hash("s_56-43_k_21-66_r_56-43_m"),
        hash("s_56-43_k_40-93__56-43_rm_21-66_"),
        hash("_56-67_n_56-67_n_35-43_"),
        hash("_56-67_n_56-67_n"),
        hash("_56-67_n_56-67_n_56-67_")
    ];
    
    const filter = new Filter({ list: bad_words });
    
    return filter.clean(message);
};
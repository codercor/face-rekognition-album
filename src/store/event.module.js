import base64ToBlob from "../helpers/base64toBlob";
export default {
    namespaced: true,
    state: {
        code: 'aa',
        name: '',
        date: '',
        results: [],
        imageBase64: '',
    },
    mutations: {
        setCode(state, code) {
            state.code = code;
        },
        setName(state, name) {
            state.name = name;
        },
        setDate(state, date) {
            state.date = date;
        },
        setImageBase64(state, imageBase64) {
            state.imageBase64 = imageBase64;
        },
        setResults(state, results) {
            state.results = results;
        },
    },
    actions: {
        setCode({ commit }, code) {
            commit('setCode', code);
        },
        setName({ commit }, name) {
            commit('setName', name);
        },
        setDate({ commit }, date) {
            commit('setDate', date);
        },
        setImageBase64({ commit }, imageBase64) {
            commit('setImageBase64', imageBase64);
        },
        getResults({ commit, state }) {
            const selfieBlob = base64ToBlob(state.imageBase64, 'image/jpeg');
            const formdata = new FormData();
            formdata.append('selfie', selfieBlob);
            formdata.append('folder', state.code);
            const requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/rekognition/searchFace", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        commit('setResults', result)
                        resolve();
                    })
                    .catch((error) => {
                        console.log("error", error)
                        reject();
                    });
            });



        },
    },
    getters: {
        code(state) {
            return state.code;
        },
        name(state) {
            return state.name;
        },
        date(state) {
            return state.date;
        },
        results(state) {
            return state.results;
        },
    },

};

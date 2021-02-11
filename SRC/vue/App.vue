<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer">

        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer">

            </v-app-bar-nav-icon>
            <v-toolbar-title>Pupil Manager</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container fluid fill-height>
                <!-- <router-view>

                </router-view> -->
                <section class="page">
                    <div class="icon">
                        <v-icon>mdi-nfc-variant</v-icon>
                    </div>
                </section>
            </v-container>
        </v-main>
        <v-footer app>
            <section>
                <v-btn color="primary" v-if="!hasPermission" @click="startScan">Give permission</v-btn>
            </section>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {
                drawer: null,
                ndef: null,
                hasPermission: false,
                cards: {
                    "04:4c:1c:3a:c1:62:80": {
                        name: "Tom Wilson",
                        lastused: null
                    }
                }
            }
        },
        computed: {
            
        },
        methods: {
            startScan: async function() {
                try {
                    this.ndef = new NDEFReader();
                    await this.ndef.scan();
                    this.ndef.onreading = event => {
                        // TODO: Handle incoming NDEF messages.
                        if(this.cards.hasOwnProperty(event.serialNumber)) {
                            alert(`You are: ${this.cards[event.serialNumber].name}`);
                            if (this.cards[event.serialNumber].lastused){
                                alert(`lastused: ${new Date(this.cards[event.serialNumber].lastused).toTimeString()}`);
                            } else {
                                alert("not yet used today")
                            }
                            this.cards[event.serialNumber].lastused = Date.now();
                        } else {
                            alert(`You are unknown to the system...`);
                        }
                    };
                } catch(e) {
                    alert(e.message);
                }
            },
            hasPermission: async function() {
                try {
                    const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });
                    if (nfcPermissionStatus.state === "granted") {
                        return true;
                    }
                    return false;
                } catch(e) {
                    alert(e.message);
                    e.code ? alert(e.code) : null;
                }
            }
        },
        mounted: async function() {
            if ('NDEFReader' in window) {
                // this.startScan();
                this.hasPermission = await this.hasPermissionGranted();
            }
        }
    }
</script>

<style scoped>
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        border-radius: 100%;
    }
    .icon i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100px;
        line-height: 1;
        width: 120px;
        height: 120px;
    }
    .icon:before {
        content: '';
        display: flex;
        position: absolute;
        width: 2px;
        height: 2px;
        border-radius: 100%;
        animation: locate-ripple 2s linear 1s infinite
    }
    @keyframes locate-ripple {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 107, 182, 0);
        }
        20% {
            box-shadow: 0 0 0 50px rgba(0, 107, 182, 0.5);
        }
        40% {
            box-shadow: 0 0 0 100px rgba(0, 107, 182, 0.3);
        }
        80% {
            box-shadow: 0 0 0 150px rgba(0, 107, 182, 0);
        }
    }
</style>
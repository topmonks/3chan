import Box from '3box';
import uuidv1 from 'uuid/v1';

const GlobalThreadAddress = "/orbitdb/zdpuAnU81tnEAjZEJ5MdP92xfK5c3KUzrafGgtnW3HFE5e7p8/3box.thread.global.threadList2";

export default class Data {
    static async init(account, eth) {
        const data = new Data();
        data.box = await Box.openBox(account, eth);
        data.account = account;
        data._onThreadListUpdate = t => console.log("ThreadList updated, no handler", t);
        return data;
    }

    sync() {
        return new Promise((resolve) => {
            this.box.onSyncDone(() => {
                resolve();
            });
        });
    }

    onThreadListUpdate(callback) {
        this._onThreadListUpdate = callback;
    }

    async isYou(did) {
        const config = await Box.getConfig(this.account);
        const dids = Object.keys(config.spaces).map(space => config.spaces[space].DID);
        console.log("isyou", config, did, dids, dids.includes(did));
        return dids.includes(did);
    }

    async getThreads({ includeReplies = 0, limit = 30, reverse = true } = {}) {
        const globalThread = await this._threadsSub();
        const threadsMsgs = await globalThread.getPosts({ limit, reverse });
        if (!threadsMsgs) return [];

        const threads = threadsMsgs.map(t => t.message);
        const loadingPromises = [];
        if (includeReplies > 0) {
            threads.forEach(thread => {
                const fn = async thread => {
                    const space = await this._getGlobalSpace();
                    const t = await space.joinThreadByAddress(thread.address);
                    console.log("get add posts", thread, t);
                    const posts = await t.getPosts({ limit: includeReplies });
                    return [thread.id, posts.map(p => p.message)];
                };
                loadingPromises.push(fn(thread));
            });
        }
        console.log("loaded threads", threads);
        return [threads, loadingPromises];
    }

    async getThreadById(id) {
        const [threads] = await this.getThreads({ limit: 0, reverse: false });
        console.log("finding threads", threads);
        const thread = threads.find(thread => thread.id === id);
        return thread ? thread : null;
    }

    async joinThread(address, listen) {
        const space = await this._getGlobalSpace();
        const thread = await space.joinThreadByAddress(address, { noAutoSub: !listen });
        return thread;
    }

    async createThread(data) {
        const globalSpace = await this._getGlobalSpace();
        const globalThread = await this._threadsSub();
        const uuid = uuidv1();
        const thread = await globalSpace.joinThread(`thread-${uuid}`);
        const threadData = {
            ...data,
            address: thread.address,
            id: uuid,
        }
        await globalThread.post(threadData);

        return threadData;
    }

    async createGlobalThread() {
        console.log("createGlobalThread");
        const space = await this.box.openSpace("global");
        const thread = await space.joinThread("threadList2");
        console.log(space, thread);
        console.log("thread address", thread.address);
    }

    logout() {
        return this.box.logout();
    }

    async _getGlobalSpace() {
        if (this._globalSpace) {
            return this._globalSpace;
        }
        this._globalSpace = await this.box.openSpace("global");
        return this._globalSpace;
    }

    async _threadsSub() {
        if (this._threadListThread) {
            return this._threadListThread;
        }
        const space = await this._getGlobalSpace();
        this._threadListThread = await space.joinThreadByAddress(GlobalThreadAddress);
        this._threadListThread.onUpdate(async () => {
            const posts = await this._threadListThread.getPosts();
            this._onThreadListUpdate(posts);
        });
        return this._threadListThread;
    }

}

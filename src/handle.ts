/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Octokit } from '@octokit/core';
import changelog2 from 'conventional-changelog-core';
import { Stream } from 'stream';
import { GetReleaseData, getReleases, GetReleasesData, GetReleasesParameters } from './releases';
import { getTags, GetTagsData, GetTagsParameters } from './tags';
const getAllReleases = async (client: Octokit, opts: Pick<GetReleasesParameters, 'owner' | 'repo'>): Promise<GetReleasesData> => {
    const releases: GetReleasesData = [];
    const perPage: number = 100;
    for (let page: number = 1; true; page++) {
        const data: GetReleasesData = await getReleases(client, {
            page: 1,
            per_page: perPage,
            ...opts,
        });
        releases.push(...data);
        if (data.length < perPage) {
            break;
        }
    }
    return releases;
}
const getAllTags = async (client: Octokit, opts: Pick<GetTagsParameters, 'owner' | 'repo'>): Promise<GetTagsData> => {
    const releases: GetTagsData = [];
    const perPage: number = 100;
    for (let page: number = 1; true; page++) {
        const data: GetTagsData = await getTags(client, {
            page: 1,
            per_page: perPage,
            ...opts,
        });
        releases.push(...data);
        if (data.length < perPage) {
            break;
        }
    }
    return releases;
}
async function stream2buffer(stream: Stream): Promise<Buffer> {

    return new Promise<Buffer>((resolve, reject) => {

        const _buf = Array<any>();

        stream.on("data", chunk => _buf.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(_buf)));
        stream.on("error", err => reject(`error converting stream - ${err}`));

    });
}
export async function getTemporaryGitDir(): Promise<string> {
    const data: string = (await stream2buffer(changelog2({
        lernaPackage: '@donmahallem/eslint-config', config: { context: {} },
        pkg: {
            path: 'F:/visual_studio/js-libs/packages/eslint-config/package.json'
        },
    },
        undefined,
        undefined,
        undefined,
        undefined,
        { cwd: 'F:/visual_studio/js-libs/' }))).toString('utf8');
    //changelog2()
    return data;
}

function filterReleases(releases: GetReleasesData, tags: GetTagsData): GetReleasesData {
    return releases
        .filter((release: ArrayItem<GetReleasesData>): boolean => {
            return tags.find((tag: ArrayItem<GetReleasesData>): boolean => {
                return release.tag_name === tag.tag_name;
            }) ? true : false;
        })
}

export const handle = async (octokit: Octokit, params: Pick<GetReleasesParameters, 'owner' | 'repo'>): Promise<void> => {
    const releases: GetReleasesData = await getAllReleases(octokit, params);
    const tags: GetTagsData = await getAllTags(octokit, params);

    console.log(releases.length, tags.length);
    const data: GetReleaseData[] = filterReleases(releases, tags);
    console.log(data.length, releases.length, tags.length);
};

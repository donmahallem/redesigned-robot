/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Octokit } from '@octokit/core';
import { GetReleasesData, GetReleasesParameters, GetReleasesResponse } from './types';

export const getReleases = async (octokit: Octokit, params: GetReleasesParameters): Promise<GetReleasesData> => {
    const listFilesResponse: GetReleasesResponse = await octokit.request('GET /repos/{owner}/{repo}/releases', params);
    return listFilesResponse.data;
};

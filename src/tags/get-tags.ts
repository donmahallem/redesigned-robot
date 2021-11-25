/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Octokit } from '@octokit/core';
import { GetTagsData, GetTagsParameters, GetTagsResponse } from './types';

export const getTags = async (octokit: Octokit, params: GetTagsParameters): Promise<GetTagsData> => {
    const listFilesResponse: GetTagsResponse = await octokit.request('GET /repos/{owner}/{repo}/tags', params);
    return listFilesResponse.data;
};

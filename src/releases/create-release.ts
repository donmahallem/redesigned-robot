/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Octokit } from '@octokit/core';
import { CreateReleaseData, CreateReleaseParameters, CreateReleaseResponse } from './types';

export const createRelease = async (octokit: Octokit, params: CreateReleaseParameters): Promise<CreateReleaseData> => {
    const listFilesResponse: CreateReleaseResponse = await octokit.request('POST /repos/{owner}/{repo}/releases', params);
    return listFilesResponse.data;
};

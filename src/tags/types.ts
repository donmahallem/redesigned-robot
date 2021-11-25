/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Endpoints } from '@octokit/types';

export type GetTagsParameters = Endpoints['GET /repos/{owner}/{repo}/tags']['parameters'];
export type GetTagsResponse = Endpoints['GET /repos/{owner}/{repo}/tags']['response'];
export type GetTagsData = Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
export type GetTagData = GetTagsData[0]
